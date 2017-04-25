
class blogpack {
  constructor(options) {
    this.config = options.config || {}
    this.plugins = options.plugins || []
    this.models = options.models
    this.redis = options.redis
  }

  async beforeUseRoutes(...args) {
    for (const plugin of this.plugins) {
      plugin.beforeUseRoutes && await plugin.beforeUseRoutes(...args)
    }
  }

  async getMiddlewareRoutes(...args) {
    const plugins = this.plugins.filter(plugin => plugin['mountingRoute'])
    const result = []
    for (const plugin of plugins) {
      const routeObj = await plugin.mountingRoute()
      result.push(Object.assign({}, routeObj, {
        needBeforeRoutes: plugin.needBeforeRoutes || false,
        needAfterRoutes: plugin.needAfterRoutes || false
      }))
    }
    return result
  }

  getBeforeRestfulRoutes() {
    return this.plugins
            .filter(plugin => plugin['beforeRestful'])
            .map(plugin => plugin['beforeRestful'])
  }

  getAfterRestfulRoutes() {
    return this.plugins
            .filter(plugin => plugin['afterRestful'])
            .map(plugin => plugin['afterRestful'])
  }

  getBeforeServerStartFuncs() {
    return this.plugins
            .filter(plugin => plugin['beforeServerStart'])
            .map(plugin => plugin['beforeServerStart'])
  }
}

module.exports = blogpack
