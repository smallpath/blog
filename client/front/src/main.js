import Vue from 'vue'
import router from './route'
import { sync } from 'vuex-router-sync'
import store from './store/index'
import App from './components/App'
import Sidebar from './components/Sidebar'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

let preFetchComponent = [
  Sidebar
]

export { app, router, store, preFetchComponent }
