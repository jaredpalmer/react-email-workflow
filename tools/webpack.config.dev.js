var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../scripts'),
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      // loader: 'babel!' + path.join(__dirname, '../node_modules/jsxstyle/lib/webpackLoader.js') + '?LayoutConstants=' + path.join(__dirname, '../src/client/LayoutConstants.js'),
      loader: 'babel',
      include: path.join(__dirname, '../src/client')
    }]
  },
  proxy: {
    '*': 'http://localhost:5000'
  }
};
