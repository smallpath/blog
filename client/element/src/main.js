/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import { sync } from 'vuex-router-sync'
// import store from './store/index'
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'

Vue.use(Element)
Vue.use(VueRouter)

import App from './App'
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';

let router = new VueRouter({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      components: {
        default: Login
      }
    },
    {
      path: '/admin/logout',
      name: 'logout',
      components: {
        default: Logout
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      components: {
        default: Dashboard
      }
    },
  ]
})

// sync(store, router)

const app = new Vue({
  router,
  // store,
  ...App
})

app.$mount('#app')

export { app, router }
