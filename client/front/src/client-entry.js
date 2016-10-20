/* eslint-disable */
// require('es6-promise').polyfill()

import './assets/res/js/base'
import { app, store } from './main'


store.replaceState(window.__INITIAL_STATE__)

// actually mount to DOM
app.$mount('#app')
