import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.dev';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 5000;
const server = global.server = express();

server.disable('x-powered-by');
server.set('port', port);
server.use(helmet());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());

if (isDeveloping) {
  server.use(morgan('dev'));
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
    res.sendFile(path.join(__dirname, '/index.html'));
  });
} else {
  server.use(morgan('combined'));
  server.use('/static', express.static(__dirname + '/dist'));
  server.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
}

server.use('/api/v0/extract', require('./api/extract'));
server.use('/api/v0/premail', require('./api/premail'));

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.log(`Node.js Environment: ${process.env.NODE_ENV}`);
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
