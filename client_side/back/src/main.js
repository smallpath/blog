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
    '/dashboard': {
        name:'dashboard', 
        component: App
    },
    '/post': {
        name:'post', 
        component: App,
        subRoutes: {
          '/list': {
            component: App
          },
          '/create': {
            component: App
          },
          '/edit/:id': {
            component: App
          }
        }
    },
    '/page': {
        name:'page', 
        component: App,
        subRoutes: {
          '/list': {
            component: App
          },
          '/create': {
            component: App
          },
          '/edit/:id': {
            component: App
          }
        }
    },
    '/user': {
        name:'user', 
        component: App,
        subRoutes: {
          '/list': {
            component: App
          },
          '/create': {
            component: App
          },
          '/edit_pwd': {
            component: App
          },
          '/edit/:id': {
            component: App
          }
        }
    },
    '/cate': {
        name:'cate', 
        component: App,
        subRoutes: {
          '/list': {
            component: App
          },
          '/create': {
            component: App
          },
          '/edit/:id': {
            component: App
          }
        }
    },
    '/tag': {
        name:'tag', 
        component: App,
        subRoutes: {
          '/list': {
            component: App
          },
          '/create': {
            component: App
          },
          '/edit/:id': {
            component: App
          }
        }
    },
    '/options': {
        name:'post', 
        component: App,
        subRoutes: {
          '/general': {
            component: App
          },
          '/two_factor_auth': {
            component: App
          },
          '/comment': {
            component: App
          },
          '/analytic': {
            component: App
          },
          '/import': {
            component: App
          }
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
