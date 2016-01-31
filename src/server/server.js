var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var path = require('path');

var port = process.env.PORT || 5000;
var app = express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v0', require('./api/premail.js'));
app.get('/check', (req, res)=> res.send('Everything is awesome!'));
app.listen(port, () => {
	// console.log(process.env);
  console.log('Listening on ' + port + '.');
  console.log('Go to <http://localhost:' + port + '> in your browser.');
});
