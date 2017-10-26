const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { server: './server.ts' },
  target: 'node',
  resolve: { extensions: ['.js', '.ts', '.json', '.node', '.html'] },
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
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
}
