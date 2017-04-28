import Vue from 'vue'
import createApp from './main'

export default context => {
  const { app, appOption, router, store, isProd, preFetchComponent } = createApp()

  const realApp = isProd ? new Vue(appOption) : app

  router.push(context.url)
  let current = router.currentRoute
  context.path = current.path
  context.query = current.query
  context.params = current.params
  context.url = current.fullPath

  context.meta = realApp.$meta()

  store.state.supportWebp = context.supportWebp

  const s = !isProd && Date.now()
  return Promise.all(preFetchComponent.concat(router.getMatchedComponents()).map((component, index) => {
    const chunkName = component.chunkName
    if (typeof chunkName === 'string') {
      context.chunkName = chunkName
    }
    if (component.preFetch) {
      return component.preFetch(store, context).catch(() => {})
    }
  })).then((arr) => {
    !isProd && console.log(`data pre-fetch: ${Date.now() - s}ms`)

    context.initialState = store.state
    return realApp
  })
}
