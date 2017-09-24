const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { server: './server.ts' },
  target: 'node',
  resolve: { extensions: ['.ts', '.js', '.json', '.node', '.html'] },
  externals: [/(node_modules|main\..*\.js)/,],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.node$/, loader: 'node-loader' },
      { test: /\.js/, loader: 'shebang-loader', include: [/node_modules\/rc/] },
      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  plugins: [
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for "WARNING Critical dependency: the request of a dependency is an expression"
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
};
