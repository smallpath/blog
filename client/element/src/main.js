/* eslint-disable */
import Vue from 'vue'

import router from './route/index'
import { sync } from 'vuex-router-sync'
import store from './store/index'

sync(store, router)

import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
Vue.use(Element)

import App from './App'

const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')

export { app, router, store }
