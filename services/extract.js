'use strict';

const http = require('http');
const jackrabbit = require('jackrabbit');
const throng = require('throng');
const logger = require('logfmt');
const axios = require('axios');
const Metascraper = require('metascraper');
const cache = require('memory-cache');
const TWENTY_FOUR_HOURS = 86400000;

const CONCURRENCY = process.env.CONCURRENCY || 1;
const RABBIT_URL =
  process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost:5672';

http.globalAgent.maxSockets = Infinity;

throng({
  workers: CONCURRENCY,
  lifetime: Infinity,
  start,
});

function start() {
  const rabbit = jackrabbit(RABBIT_URL);
  const exchange = rabbit.default();
  logger.log({ type: 'info', message: 'serving extract service' });

  exchange.queue({ name: 'extract.post' }).consume(onRequestDataExtraction);

  process.on('SIGTERM', process.exit);
  process.once('uncaughtException', onError);

  function onRequestDataExtraction(message, reply) {
    logger.log(message);
    const timer = logger.time('extract.post').namespace(message);
    const cachedResult = cache.get(message.url);
    if (cachedResult) {
      return reply(cachedResult);
    }
    Metascraper.scrapeUrl(message.url)
      .then(data => {
        timer.log();
        const payload = {
          url: data.url,
          title: data.title,
          content: data.description,
          author: data.publisher,
          image: data.image,
        };
        cache.put(message.url, payload, TWENTY_FOUR_HOURS);
        logger.log(Object.assign({}, { type: 'info' }, payload));
        reply(payload);
      })
      .catch(e => {
        timer.log();
        const data = {
          type: 'error',
          error_code: e.data.error_code, // eslint-disable-line
          error_message: e.data.error_message, // eslint-disable-line
        };
        logger.log({ type: 'info', message: e.data.error_message }); // eslint-disable-line
        reply(data);
      });
  }

  function onError(err) {
    logger.log(
      {
        type: 'error',
        service: 'extract',
        error: err,
        stack: err.stack || 'No stacktrace',
      },
      process.stderr
    );
    logger.log({ type: 'info', message: 'killing extract' });
    process.exit();
  }
}
