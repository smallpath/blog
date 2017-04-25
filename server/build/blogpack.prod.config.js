const devConfig = require('./blogpack.dev.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'

const config = Object.assign({}, devConfig)

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
