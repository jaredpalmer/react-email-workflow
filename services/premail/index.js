const http = require('http');
const jackrabbit = require('jackrabbit');
const throng = require('throng');
const logger = require('logfmt');
const request = require('request');
const axios = require('axios');
const cpus = require('os').cpus().length;
const premailer = require('premailer-api');
const createHTML = require('./createHTML');

const concurrency = process.env.NODE_ENV === 'production' ? cpus : 1;
const RABBIT_URL = process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost:5672';

http.globalAgent.maxSockets = Infinity;

throng({
  workers: concurrency,
  lifetime: Infinity,
  start,
});

function start() {
  const rabbit = jackrabbit(RABBIT_URL);
  const exchange = rabbit.default();
  logger.log({ level: 'info', message: 'serving premail service' });

  exchange
    .queue({ name: 'premail.post' })
    .consume(onPremail);

  process.on('SIGTERM', process.exit);
  process.once('uncaughtException', onError);

  function onPremail(message, reply) {
    logger.log({ level: 'info', message: `inlining email with ${message.elements.length} elements` });
    const timer = logger.time('premail.post').namespace(message);
    const timer2 = logger.time('createHTML').namespace(message);
    createHTML(message, html => {
      timer2.log()
      premailer.prepare({ html, adapter: 'nokogiri' }, (err, email) => {
        timer.log();
        if (err) throw err
        if (email.html) {
          reply({ html: email.html });
        }
      });
    });
  }

  function onError(err) {
    logger.log({
      type: 'error',
      service: 'premail',
      error: err,
      stack: err.stack || 'No stacktrace',
    }, process.stderr);
    logger.log({ level: 'info', message: 'killing premail service' });
    process.exit();
  }
}
