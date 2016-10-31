// require('es6-promise').polyfill()

import './assets/res/js/base'
import { app, router, store } from './main'

store.replaceState(window.__INITIAL_STATE__)

// actually mount to DOM
app.$mount('#app')

if (window.__INITIAL_STATE__.siteInfo) {
  let analyzeCode = window.__INITIAL_STATE__.siteInfo.analyze_code
  if (analyzeCode && analyzeCode.value !== '') {
    // init google analytics
    window.ga = window.ga || function () { (window.ga.q = window.ga.q || []).push(arguments) }
    window.ga.l = +new Date()
    window.ga('create', analyzeCode.value, 'auto')
    window.ga('send', 'pageview')

    // send google analytics when routes change
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
