var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var axios = require('axios');
var path = require('path');

var graphbrainz = require('graphbrainz');

// configure webpack
var stylePath = path.join(__dirname, 'static/style/main.css');
var compiler = webpack({
  entry: ['./index.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      configVariables: path.join(__dirname, 'config.js'),
      style: stylePath
    },
    modules: [path.join(__dirname, 'node_modules')]
  },
  plugins: [
    require('precss'),
    require('autoprefixer'),
    new webpack.ProvidePlugin({
      configVariables: 'configVariables'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: /static/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
            }
          },
        ]
      }
    ]
  },
});

// serve bundled
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/static/',
  stats: {colors: true}
});

app.use('/graphbrainz', graphbrainz.default());
app.use('/', express.static('static'));
app.listen(process.env.PORT || 3000);
console.log('The App Server is running.')
