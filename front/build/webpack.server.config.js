const webpack = require('webpack')
const base = require('./webpack.base.config')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"',
    'process.BROWSER': false
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new VueSSRPlugin())
}

module.exports = Object.assign({}, base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/server-entry.js',
  output: Object.assign({}, base.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  }),
  resolve: {
    alias: Object.assign({}, base.resolve.alias, {
      'create-api': './create-api-server.js',
      'create-route': './create-route-server.js'
    }),
    extensions: base.resolve.extensions
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: plugins
})
