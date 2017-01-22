const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const proxyTable = require('../config/index').dev.proxyTable;
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')
const proxyMiddleware = require('http-proxy-middleware')

module.exports = function setupDevServer (app, onUpdate) {
  // setup on the fly compilation + hot-reload
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig)
  app.use(require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  }))
  app.use(require('webpack-hot-middleware')(clientCompiler))

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(context, options))
  })

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, serverConfig.output.filename)
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'))
  })
}