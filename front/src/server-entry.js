import Vue from 'vue'
import { app, appOption, router, store, preFetchComponent, isProd } from './main'

const isDev = process.env.NODE_ENV !== 'production'

let realApp = isProd ? new Vue(appOption) : app

export default context => {
  router.push(context.url)
  let current = router.currentRoute
  context.path = current.path
  context.query = current.query
  context.params = current.params
  context.url = current.fullPath

  context.meta = realApp.$meta()

  store.state.supportWebp = context.supportWebp

  const s = isDev && Date.now()
  return Promise.all(preFetchComponent.concat(router.getMatchedComponents()).map((component, index) => {
    const chunkName = component.chunkName
    if (typeof chunkName === 'string') {
      context.chunkName = chunkName
    }
    if (component.preFetch) {
      return component.preFetch(store, context).catch(() => {})
    }
  })).then((arr) => {
    isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)

    context.initialState = store.state
    return realApp
  })
}
