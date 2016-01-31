const path = require('path');
const express = require('express');
const webpack = require('webpack');
const httpProxy = require("http-proxy");
const proxy = new httpProxy.createProxyServer();
const config = require('./webpack.config.dev');
const morgan = require('morgan');
const app = express();
const compiler = webpack(config);
app.use(morgan('dev'));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  inline: true,
  progress: true,
  historyApiFallback: true,
  colors: true,
  stats: true,
}));
app.use(require('webpack-hot-middleware')(compiler));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/client/public/index.html'));
});
if (config.proxy) {
  var paths = Object.keys(config.proxy);
  paths.forEach(function (path) {
    var proxyOptions;
    if (typeof config.proxy[path] === 'string') {
      proxyOptions = {target: config.proxy[path], ws: true};
    } else {
      proxyOptions = config.proxy[path];
    }
    app.all(path, function (req, res) {
      proxy.web(req, res, proxyOptions);
    });
  });
}

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
