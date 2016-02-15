import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';

const port = process.env.PORT || 5000;
const server = global.server = express();

server.disable('x-powered-by');
server.set('port', port);
server.use(helmet());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan('combined'));
server.use(compression());

server.use('/static', express.static(__dirname + '/public'));
server.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

server.use('/api/v0/extract', require('./api/extract'));
server.use('/api/v0/premail', require('./api/premail'));

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.log(`Node.js Environment: ${process.env.NODE_ENV}`);
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
