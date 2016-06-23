const path = require('path')
const webpack = require('webpack')
const CONFIG = require('./webpack.base')

const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack-hot-middleware/client',
    CLIENT_ENTRY
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    })
  ],
  module: {
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.js?$/,
        loader: 'standard',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel!' + path.join(__dirname, '../node_modules/jsxstyle/lib/webpackLoader.js') + '?LayoutConstants=' + path.join(__dirname, '../client', 'LayoutConstants.js'),
        include: CLIENT_ENTRY
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        // This is so you can have a global CSS file and load vendor CSS.
        test: /\.css$/,
        include: /node_modules|client/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url',
        query: { limit: 10000, name: '[name].[hash:8].[ext]' },
        include: CLIENT_ENTRY
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'url',
        query: { limit: 10000, name: '[name].[hash:8].[ext]' },
        include: CLIENT_ENTRY
      }
    ]
  },
  standard: {
    // config options to be passed through to standard e.g.
    parser: 'babel-eslint'
  }
}
