import Vue from 'vue'
import router from './route'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import Sidebar from './components/Sidebar'

sync(store, router)

const isProd = process.env.NODE_ENV === 'production'

const appOption = {
  router,
  store,
  ...App
}

let app
if (isProd === false) {
  app = new Vue(appOption)
}

let preFetchComponent = [
  Sidebar
]

export { app, appOption, router, store, preFetchComponent, isProd }
