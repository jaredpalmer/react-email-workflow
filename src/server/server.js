const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v0/premail', require('./api/premail'));
app.use('/api/v0/extract', require('./api/extract'));
app.get('/check', (req, res)=> res.send('Everything is awesome!'));
app.listen(port, () => {
  console.log('Listening on ' + port + '.');
  console.log('Go to <http://localhost:' + port + '> in your browser.');
});
