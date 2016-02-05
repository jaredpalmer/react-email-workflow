// jscs:disable
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client?reload=true',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
     new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
// loader: 'babel!' + path.join(__dirname, 'node_modules/jsxstyle/lib/webpackLoader.js') + '?LayoutConstants=' + path.join(__dirname, 'src', 'LayoutConstants.js'),
