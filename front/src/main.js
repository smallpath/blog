import Vue from 'vue'
import createRouter from './route'
import createStore from './store/index'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import Sidebar from './components/Sidebar'

const isProd = process.env.NODE_ENV === 'production'

export default function createApp(context) {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

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

  return { app, appOption, router, store, preFetchComponent, isProd }
}
