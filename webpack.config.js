// jscs:disable
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
module.exports = {
  devtool: false,
  entry: {
    bundle: ['./src/index'],
    vendors: [
      'react',
      'react-dom',
      'react-redux',
      'react-textarea-autosize',
      'react-dnd',
      'react-dnd-html5-backend',
      'redux',
      'redux-thunk',
      'jsxstyle',
      'codemirror',
      'classnames',
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendors']
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel!' + path.join(__dirname, 'node_modules/jsxstyle/lib/webpackLoader.js') + '?LayoutConstants=' + path.join(__dirname, 'src', 'LayoutConstants.js'),
      include: path.join(__dirname, 'src')
    }]
  }
};
