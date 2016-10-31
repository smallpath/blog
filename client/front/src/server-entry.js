import { app, router, store } from './main'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  // set router's location
  router.push(context.url)

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
