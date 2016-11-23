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

import api from './store/api'

const { request } = api;

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (request.method == 'get' && request.url.indexOf('/proxyPrefix/user') == -1 ){
    return config;
  }

  if (token !== null && token !== 'undefined') {
    config.headers['authorization'] = token;
  }

  return config;
}, (error) => Promise.reject(error));

request.interceptors.response.use((response) => {
  if (response.data && response.data.status && response.data.status === 'fail') {
    console.log(response.data.description);
  }
  return response;
}, (error) => Promise.reject(error));

const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')

export { app, router, store }
