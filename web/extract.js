'use strict';

const express = require('express');
const { Router } = express;
const router = new Router();
const Metascraper = require('metascraper');
const logger = require('logfmt');
const cache = require('memory-cache');
const TWENTY_FOUR_HOURS = 86400000;

/**
 * POST Extract content from url.
 */
router.post('/', (req, res, next) => {
  if (!req.body.url) {
    return res.status(400).json({
      type: 'error',
      error_code: 400,
      error_message: 'Invalid request. Missing url',
    });
  }
  const timer = logger.time('extract.post').namespace(req.body.url);
  Metascraper.scrapeUrl(req.body.url).then(
    data => {
      const payload = {
        url: data.url || req.body.url || '',
        title: data.title || 'Unable to scrape title.',
        content:
          data.description ||
          "Error: Unable to scrape description from the provided url. You'll have to do this on your own.",
        author: data.publisher || 'Unable to scrape author.',
        image: data.image || '',
      };
      cache.put(req.body.url, payload, TWENTY_FOUR_HOURS);
      logger.log(Object.assign({}, { type: 'info' }, payload));
      res.status(200).json(payload);
    },
    e => {
      timer.log();
      if (e) {
        const error_code = e && e.data && (e.data.error_code || 500);
        const error_message =
          e && e.data && (e.data.error_message || 'Something went wrong');
        const data = {
          type: 'error',
          error_code,
          error_message,
        };
        logger.log({
          type: 'info',
          message: error_message,
        });
        return res.status(500).json(data);
      }
      logger.log({
        type: 'info',
        message: 'Unable to scrape URL',
      });
      return res.status(500).json({
        type: 'error',
        error_code: 500,
        error_message: 'Something went wrong',
      });
    }
  );
});

module.exports = router;
