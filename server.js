var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var axios = require('axios');
var path = require('path');

var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLNonNull = graphql.GraphQLNonNull;
var GraphQLInt = graphql.GraphQLInt;

var graphbrainz = require('graphbrainz');

// configure webpack
var compiler = webpack({
  entry: ['./index.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      'configVariables': path.join(__dirname, 'config.js')
    },
    modules: [path.join(__dirname, 'node_modules')]
  },
  plugins: [
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
      }
    ]
  }
});

// serve bundled
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  // proxy: {'/graphql': `http://localhost:${8080}`},
  publicPath: '/static/',
  stats: {colors: true}
});

app.use('/graphbrainz', graphbrainz.default());
app.use('/', express.static('static'));
app.listen(process.env.PORT || 3000);
console.log('The App Server is running.')
