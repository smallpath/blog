import Vue from 'vue'
import { appOption, router, store, preFetchComponent } from './main'

const isDev = process.env.NODE_ENV !== 'production'

const app = new Vue(appOption)

export default context => {
  router.push(context.url)
  let current = router.currentRoute
  context.path = current.path
  context.query = current.query
  context.params = current.params
  context.url = current.fullPath

  context.meta = app.$meta()

  const s = isDev && Date.now()

  return Promise.all(preFetchComponent.concat(router.getMatchedComponents()).map((component, index) => {
    if (component.preFetch) {
      return component.preFetch(store, context).catch(() => {})
    }
  })).then((arr) => {
    isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)

    context.initialState = store.state
    return app
  })
}
