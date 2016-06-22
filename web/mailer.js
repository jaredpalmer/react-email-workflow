'use strict'

const express = require('express')
const { Router } = express
const router = new Router()
const jackrabbit = require('jackrabbit')

const RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost:5672'
const EXPIRATION = process.env.SERVICE_TIME || 3000

const rabbit = jackrabbit(RABBIT_URL)
const exchange = rabbit.default()

/**
 * POST Send an HTML email
 */
router.post('/', (req, res, next) => {
  const { from, to, subject, replyTo, tracking, campaign, html } = req.body
  exchange.publish({ from, to, subject, replyTo, tracking, campaign, html }, {
    expiration: EXPIRATION,
    key: 'mail.send',
    reply: (data) => {
      const status = data.error_code ? data.error_code : 200
      res.status(status).json(data)
    }
  })
})

module.exports = router
