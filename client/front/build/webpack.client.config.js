const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.config')
const utils = require('./utils')
const vueConfig = require('./vue-loader.config')
const config = require('../config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

const commonConfig = merge(base, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: 'client-bundle.js',
    //chunkFilename: 'mainfest.js'
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
      // http://vuejs.github.io/vue-loader/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': env
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      // extract css into its own file
      new ExtractTextPlugin('styles.css'),
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: process.env.NODE_ENV === 'testing'
          ? 'index.html'
          : config.build.index,
        template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      }),
      // split vendor js into its own file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'client-vendor-bundle.js',
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules')
            ) === 0
          )
        }
      }),
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor'],
        filename: 'manifest.js',
      })
    ]
})

// if (process.env.NODE_ENV === 'production') {
//   // Use ExtractTextPlugin to extract CSS into a single file
//   // so it's applied on initial render
//   const ExtractTextPlugin = require('extract-text-webpack-plugin')

//   // vueConfig is already included in the config via LoaderOptionsPlugin
//   // here we overwrite the loader config for <style lang="stylus">
//   // so they are extracted.
//   vueConfig.loaders = {
//     stylus: ExtractTextPlugin.extract({
//       loader: "css-loader!stylus-loader",
//       fallbackLoader: "vue-style-loader" // <- this is a dep of vue-loader
//     })
//   }

//   config.plugins.push(
//     new ExtractTextPlugin('styles.css'),
//     // this is needed in webpack 2 for minifying CSS
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     }),
//     // minify JS
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       }
//     })
//   )
// }

module.exports = commonConfig
