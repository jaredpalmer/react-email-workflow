'use strict'

const http = require('http')
const jackrabbit = require('jackrabbit')
const throng = require('throng')
const logger = require('logfmt')
const premailer = require('premailer-api')
const createHTML = require('./createHTML')

const CONCURRENCY = process.env.CONCURRENCY || 1
const RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost:5672'

http.globalAgent.maxSockets = Infinity

throng({
  workers: CONCURRENCY,
  lifetime: Infinity,
  start
})

function start () {
  const rabbit = jackrabbit(RABBIT_URL)
  const exchange = rabbit.default()
  logger.log({ type: 'info', message: 'serving premail service' })

  exchange
    .queue({ name: 'premail.post' })
    .consume(onPremail)

  process.on('SIGTERM', process.exit)
  process.once('uncaughtException', onError)

  function onPremail (message, reply) {
    logger.log({ type: 'info', message: `inlining email with ${message.elements.length} elements` })
    const timer = logger.time('premail.post').namespace({ type: 'info', 'elements.length': message.elements.length })
    const timer2 = logger.time('createHTML').namespace({ type: 'info', 'elements.length': message.elements.length })
    createHTML(message, html => {
      timer2.log()
      premailer.prepare({ html, adapter: 'nokogiri' }, (err, email) => {
        timer.log()
        if (err) throw err
        if (email.html) {
          reply({ html: email.html })
        }
      })
    })
  }

  function onError (err) {
    logger.log({
      type: 'error',
      service: 'premail',
      error: err,
      stack: err.stack || 'No stacktrace'
    }, process.stderr)
    logger.log({ type: 'info', message: 'killing premail service' })
    process.exit()
  }
}
