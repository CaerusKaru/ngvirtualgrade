const path = require('path');

module.exports = {
  entry: {
    // This is our Express server for Dynamic universal
    server: './server.ts'
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js', '.json', '.node', '.html']
    // alias: {
    //   'main.server': path.join(__dirname, 'dist', 'server', 'main.bundle')
    // }
  },
  // Make sure we include all node_modules etc
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    // Puts the output at the root of the dist folder
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
  }
};
