'use strict'

const http = require('http')
// const throng = require('throng')
const logger = require('logfmt')
const jackrabbit = require('jackrabbit')

http.globalAgent.maxSockets = Infinity

const web = require('./web')

const RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost:5672'
const PORT = process.env.PORT || 5000
// const CONCURRENCY = process.env.CONCURRENCY || 1

const __DEV__ = process.env.NODE_ENV === 'development'

// throng(start, { workers: 1, lifetime: Infinity })

function start () {
  logger.log({ type: 'info', message: 'starting server' })

  let server
  const broker = jackrabbit(RABBIT_URL)

  broker.once('connected', listen)
  broker.once('disconnected', exit.bind(this, 'disconnected'))

  process.on('SIGTERM', exit)

  function listen () {
    const app = web(__DEV__)
    server = http.createServer(app)
    server.listen(PORT, (err) => {
      if (err) throw err
      logger.log({ type: 'info', message: `running on port ${PORT} in ${process.env.NODE_ENV} mode` })
    })
  }

  function exit (reason) {
    logger.log({ type: 'info', message: 'closing server', reason: reason })
    if (server) server.close(process.exit.bind(process))
    else process.exit()
  }
}

start()
