var express = require('express')
var path = require('path')

var port = process.env.PORT || 3000

express()
  .use('/public', express.static(__dirname + '/public'))
  .get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
  })
  .listen(port, function () {
  	console.log(process.env)
    console.log('Listening on ' + port + '.')
    console.log('Go to <http://localhost:' + port + '> in your browser.')
  })
