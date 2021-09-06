const path = require('path')

const nodeExternals = require('webpack-node-externals')

const server = {
  target: 'node',
  mode: 'development',
  entry: './src/main.ts',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs'],
    modules: ['node_modules', 'src'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', 'dist', 'server'),
  },
}

module.exports = [server]
