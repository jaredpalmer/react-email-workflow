'use strict'

const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')
const logger = require('logfmt')

function api(__DEV__) {
  const server = express();
  server.disable('x-powered-by');
  server.use(helmet());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(compression());

  if (__DEV__) {
    server.use(logger.requestLogger((req, res) => {
      var path = req.originalUrl || req.path || req.url;
      return {
        method: req.method,
        status: res.statusCode,
        path,
      };
    }));
    const config = require('../webpack.config.dev')
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack(config);
    const middleware = webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    });
    server.use(middleware);
    server.use(webpackHotMiddleware(compiler));
  } else {
    server.use('/static', express.static(path.join(__dirname, '../dist')));
  }

  server.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  server.use('/api/v0/extract', require('./extract'));
  server.use('/api/v0/premail', require('./premail'));

  return server;
}

module.exports = api
