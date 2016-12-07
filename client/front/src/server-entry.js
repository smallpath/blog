import { app, router, store } from './main'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  router.push(context.url)
  let current = router.history.current
  context.path = current.path
  context.query = current.query
  context.params = current.params
  context.url = current.fullPath

  const s = isDev && Date.now()

  return Promise.all(router.getMatchedComponents().map(function (component, index) {
    if (component.preFetch) {
      return component.preFetch(store, context)
    }
  })).then((arr) => {
    isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)

    context.initialState = store.state
    return app
  })
}
