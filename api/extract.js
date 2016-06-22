const express = require('express');
const { Router } = express;
const router = new Router();
const jackrabbit = require('jackrabbit')

const RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost:5672';
const EXPIRATION = process.env.SERVICE_TIME || 3000;

const rabbit = jackrabbit(RABBIT_URL)
const exchange = rabbit.default()

/**
 * POST Extract content from url.
 */
router.post('/', getExtractionData, (req, res, next) => {
  const data = res.locals.data;
  const status = data.error_code ? data.error_code : 200;
  res.status(status).json(data);
});

function getExtractionData(req, res, next) {
  exchange.publish({ url: req.body.url }, {
    expiration: EXPIRATION,
    key: 'extract.post',
    reply: (data) => {
      res.locals.data = data;
      next();
    },
  });
}

module.exports = router;
