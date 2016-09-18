/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import App from './App'

let router = new VueRouter()

router.map({
    '/': {
        name:'main', 
        component: App
    },
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})


router.redirect({
  '*': '/'
})

router.start(Vue.extend({}), 'body')
