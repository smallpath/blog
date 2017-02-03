import router from './route'
import { sync } from 'vuex-router-sync'
import store from './store/index'
import App from './components/App'
import Sidebar from './components/Sidebar'

sync(store, router)

const appOption = {
  router,
  store,
  ...App
}

let preFetchComponent = [
  Sidebar
]

export { appOption, router, store, preFetchComponent }
