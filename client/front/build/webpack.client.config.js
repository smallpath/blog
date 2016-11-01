const webpack = require('webpack')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const commonConfig = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // extract vendor chunks for better caching
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'client-vendor-bundle.js'
    // })
  ])
})

if (process.env.NODE_ENV !== 'production'){

  // vueConfig.loaders = utils.cssLoaders();

  // commonConfig.plugins.push(
  //   // this is needed in webpack 2 for minifying CSS
  //   new webpack.LoaderOptionsPlugin({
  //     minimize: false,
  //   })
  // )
} else {
  // Use ExtractTextPlugin to extract CSS into a single file
  // so it's applied on initial render

  // vueConfig is already included in the config via LoaderOptionsPlugin
  // here we overwrite the loader config for <style lang="stylus">
  // so they are extracted.
  vueConfig.loaders = utils.cssLoaders({
    extract: true,
  });

  commonConfig.plugins.push(
    new ExtractTextPlugin('styles.css'),
    // this is needed in webpack 2 for minifying CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = commonConfig
