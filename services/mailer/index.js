'use strict'

const http = require('http')
const jackrabbit = require('jackrabbit')
const throng = require('throng')
const logger = require('logfmt')
const Mailgun = require('mailgun-js')

const CONCURRENCY = process.env.CONCURRENCY || 1
const RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost:5672'
const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_SECRET,
  domain: process.env.MAILGUN_DOMAIN
})

http.globalAgent.maxSockets = Infinity

throng({
  workers: CONCURRENCY,
  lifetime: Infinity,
  start
})

function start () {
  const rabbit = jackrabbit(RABBIT_URL)
  const exchange = rabbit.default()
  logger.log({ type: 'info', message: 'serving mailer service' })

  exchange
    .queue({ name: 'mail.send' })
    .consume(onSendMail)

  process.on('SIGTERM', process.exit)
  process.once('uncaughtException', onError)

  function onSendMail (message, reply) {
    logger.log(message)
    const timer = logger.time('mail.send').namespace(message)
    mailgun.messages().send({
      from: message.from,
      to: message.to,
      subject: message.subject,
      'h:Reply-To': message.replyTo,
      'o:tracking': message.tracking,
      'o:campaign': message.campaign,
      html: message.html
    }).then(response => {
      console.log(response)
      timer.log()
      reply(response)
    }).catch(e => {
      timer.log()
      throw new Error(e)
    })
  }

  function onError (err) {
    logger.log({
      type: 'error',
      service: 'extract',
      error: err,
      stack: err.stack || 'No stacktrace'
    }, process.stderr)
    logger.log({ type: 'info', message: 'killing mailer' })
    process.exit()
  }
}
