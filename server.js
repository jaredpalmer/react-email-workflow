var express = require('express')
var path = require('path')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var helmet = require('helmet')
var cookieParser = require('cookie-parser')
var port = process.env.PORT || 5000
var server = global.server = express()

server.disable('x-powered-by')
server.set('port', port)
server.use(helmet())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cookieParser())
server.use(morgan('dev'))
server.use('/static', express.static(__dirname + '/dist'))

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

server.use('/api/v0/extract', require('./api/extract'))
server.use('/api/v0/premail', require('./api/premail'))

server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
  })

server.listen(port, function () {
  	// console.log(process.env)
    console.log('Listening on ' + port + '.')
    console.log('Go to <http://localhost:' + port + '> in your browser.')
  })
