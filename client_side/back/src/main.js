/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import App from './App'
import Login from './components/Login';
import Dashboard from './components/Dashboard';

let router = new VueRouter()

router.map({
    '/': {
        name:'main', 
        component: App
    },
    '/dashboard': {
        name:'dashboard', 
        component: App
    },
    '/post': {
        name:'post', 
        component: App,
        subRoutes: {
          '/list': {
            component: Login
          },
          '/create': {
            component: Login
          },
          '/edit/:id': {
            component: Login
          }
        }
    },
    '/page': {
        name:'page', 
        component: App,
        subRoutes: {
          '/list': {
            component: Login
          },
          '/create': {
            component: Login
          },
          '/edit/:id': {
            component: Login
          }
        }
    },
    '/user': {
        name:'user', 
        component: App,
        subRoutes: {
          '/list': {
            component: Login
          },
          '/edit_pwd': {
            component: Login
          },
        }
    },
    '/cate': {
        name:'cate', 
        component: App,
        subRoutes: {
          '/list': {
            component: Login
          },
          '/create': {
            component: Login
          },
          '/edit/:id': {
            component: Login
          }
        }
    },
    '/tag': {
        name:'tag', 
        component: App,
        subRoutes: {
          '/list': {
            component: Login
          },
          '/create': {
            component: Login
          },
          '/edit/:id': {
            component: Login
          }
        }
    },
    '/options': {
        name:'post', 
        component: App,
        subRoutes: {
          '/general': {
            component: Login
          },
          '/comment': {
            component: Login
          },
          '/analytic': {
            component: Login
          },
        }
    },
    
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})


router.redirect({
  '*': '/'
})

router.start(Vue.extend({}), 'body')
