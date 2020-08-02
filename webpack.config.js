const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals');


var fs = require('fs');
var nodeModules = {};
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });


const webapp = {
  mode: 'development',
  entry: './src/main.tsx',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: [/\.css$/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/\.styl$/],
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx', '.mjs'],
    modules: [
      'node_modules',
      'src'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}

const server = {
  mode: 'development',
  entry: './src/server/main.ts',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  target: 'node',
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx', '.mjs'],
    modules: [
      'node_modules',
      'src/server'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'server')
  },
}

module.exports = [webapp, server]
