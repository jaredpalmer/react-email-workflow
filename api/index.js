import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import logger from 'logfmt';
import compression from 'compression';

export default function api(isDeveloping) {
  const server = express();
  server.disable('x-powered-by');
  server.use(helmet());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(compression());

  if (isDeveloping) {
    server.use(logger.requestLogger((req, res) => {
      var path = req.originalUrl || req.path || req.url;
      return {
        method: req.method,
        status: res.statusCode,
        path,
      };
    }));
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
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
    server.get('*', function response(req, res) {
      res.sendFile(path.join(__dirname, '../index.html'));
    });
  } else {
    server.use('/static', express.static(path.join(__dirname, '../dist')));
    server.get('*', function response(req, res) {
      res.sendFile(path.join(__dirname, '../index.html'));
    });
  }

  server.use('/api/v0/extract', require('./extract'));
  server.use('/api/v0/premail', require('./premail'));

  return server;
}
