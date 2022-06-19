const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    server: path.resolve(__dirname, '../src/cluster.ts'),
  },
  target: 'node',
  output: {
    publicPath: '',
    filename: 'multy.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
    clean: false,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, '..'),
    },
    fallback: {
      crypto: false,
      fs: false,
      path: false,
    },
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
};