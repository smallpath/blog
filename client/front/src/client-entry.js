require('es6-promise').polyfill()

import './assets/res/js/base'
import { app, router, store } from './main'

store.replaceState(window.__INITIAL_STATE__)

app.$mount('#app')

router.beforeEach((to, from, next) => {
  let loadingPromise = store.dispatch('START_LOADING')
  let endLoadingCallback = () => {
    return loadingPromise.then(interval => {
      clearInterval(interval)
      store.dispatch('SET_PROGRESS', 100)
      next()
    })
  }

  if (to.matched.length !== 0) {
    let component = to.matched[0].components.default
    if (component.preFetch) {
      // component need fetching some data before navigating to it
      return component.preFetch(store, to, endLoadingCallback)
    } else {
      // component's a static page and just navigate to it
      endLoadingCallback()
    }
  } else {
    // TODO: redirect to a global 404 page
    endLoadingCallback()
  }
})

// send user info if google analytics code is provided.
if (window.__INITIAL_STATE__.siteInfo) {
  let analyzeCode = window.__INITIAL_STATE__.siteInfo.analyzeCode
  if (analyzeCode && analyzeCode.value !== '') {
    window.ga = window.ga || function () { (window.ga.q = window.ga.q || []).push(arguments) }
    window.ga.l = +new Date()
    window.ga('create', analyzeCode.value, 'auto')
    window.ga('send', 'pageview')
    router.afterEach((route) => {
      window.ga('send', {
        hitType: 'pageview',
        page: route.path,
        location: window.location.origin + route.path,
        title: route.name || ''
      })
    })
  }
}
