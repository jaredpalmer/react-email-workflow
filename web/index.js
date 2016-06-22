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

  let assets, config

  if (__DEV__) {
    server.use(logger.requestLogger((req, res) => {
      var path = req.originalUrl || req.path || req.url;
      return {
        method: req.method,
        status: res.statusCode,
        path,
      };
    }));
    config = require('../tools/webpack.dev')
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack(config);
    const middleware = webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'client',
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
    config = require('../tools/webpack.prod')
    assets = require('../assets.json')
    server.use(helmet())
    server.use(compression())
  }

  server.use(express.static(path.join(__dirname, '../public')))

  server.use('/api/v0/extract', require('./extract'));
  server.use('/api/v0/premail', require('./premail'));

  server.get('*', function response(req, res) {
    res.status(200).send(`
      <!doctype html>
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>React Email Workflow</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="React Email Workflow." />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
          <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        </head>
        <body>
          <div id='root'></div>
          <script src="${__DEV__ ?  'assets/main.js' : assets.main.js }"></script>
        </body>
      </html>
    `)
  });


  return server;
}

module.exports = api
