// jscs:disable
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var PROD = process.env.NODE_ENV == "production";

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = [{
  name: 'client',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEV__: false
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015&presets[]=react&presets[]=stage-0!' + path.join(__dirname, 'node_modules/jsxstyle/lib/webpackLoader.js') + '?LayoutConstants=' + path.join(__dirname, 'src', 'LayoutConstants.js'),
      include: path.join(__dirname, 'src')
    }]
  }
}, {
    name: 'server',
    cache: false,
    debug: false,
    profile: false,
    bail: true,
    target: 'node',
    entry: './server.js',
    // devtool: 'sourcemap',
    output: {
        // path: path.join(__dirname, 'dist'),
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs2',
    },
    externals: nodeModules,
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            },
            __CLIENT__: false,
            __SERVER__: true,
            __DEV__: false
        }),
        new webpack.BannerPlugin('require("source-map-support").install();',
            { raw: true, entryOnly: false })
    ]
}];
