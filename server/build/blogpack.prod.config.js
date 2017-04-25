const blogpack = require('../blogpack')
const devConfig = require('./blogpack.dev.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'

const config = Object.assign({}, devConfig, {
  plugins: devConfig.plugins.concat([
    new blogpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
      'process.BROWSER': true
    })
  ])
})

const RatelimitPlugin = require(`${useRoutesPrefix}/ratelimit`)

config.plugins.unshift(
  // beforeUseRoutes
  new RatelimitPlugin({
    duration: 1000,
    errorMessage: 'Slow Down Your Request.',
    id: ctx => ctx.ip,
    max: 10
  })
)

module.exports = config
