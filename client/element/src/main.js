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
import PostList from './components/pages/PostList';
import PostCreate from './components/pages/PostCreate';
import PageList from './components/pages/PageList';
import PageCreate from './components/pages/PageCreate';
import PageSetting from './components/pages/PageSetting';
import CateList from './components/pages/CateList';
import CateCreate from './components/pages/CateCreate';
import TagList from './components/pages/TagList';
import TagCreate from './components/pages/TagCreate';
import VersionList from './components/pages/VersionList';
import VersionCreate from './components/pages/VersionCreate';
import User from './components/pages/User';
import OptionGeneral from './components/pages/OptionGeneral';
import OptionComment from './components/pages/OptionComment';
import OptionAnalytic from './components/pages/OptionAnalytic';

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
    {
      path: '/post',
      name: 'post',
      components: {
        default: Dashboard
      },
      children: [
        {
          path: 'list',
          name: 'postList',
          components: {
            default: PostList
          }
        },
        {
          path: 'create',
          name: 'postCreate',
          components: {
            default: PostList
          }
        },
      ]
    },
    {
      path: '/page',
      name: 'page',
      components: {
        default: Dashboard
      },
      children: [
        {
          path: 'list',
          name: 'pageList',
          components: {
            default: PageList
          }
        },
        {
          path: 'create',
          name: 'pageCreate',
          components: {
            default: PageCreate
          }
        },
        {
          path: 'setting',
          name: 'pageSetting',
          components: {
            default: PageSetting
          }
        },
      ]
    },
    {
      path: '/cate',
      name: 'cate',
      components: {
        default: Dashboard
      },
      children: [
        {
          path: 'list',
          name: 'cateList',
          components: {
            default: CateList
          }
        },
        {
          path: 'create',
          name: 'cateCreate',
          components: {
            default: CateCreate
          }
        },
      ]
    },
    {
      path: '/tag',
      name: 'tag',
      components: {
        default: Dashboard
      },
      children: [
        {
          path: 'list',
          name: 'tagList',
          components: {
            default: TagList
          }
        },
        {
          path: 'create',
          name: 'tagCreate',
          components: {
            default: TagCreate
          }
        },
      ]
    },
    {
      path: '/version',
      name: 'version',
      components: {
        default: Dashboard
      },
      children: [
        {
          path: 'list',
          name: 'versionList',
          components: {
            default: VersionList
          }
        },
        {
          path: 'create',
          name: 'versionCreate',
          components: {
            default: VersionCreate
          }
        },
      ]
    },
    {
      path: '/user',
      name: 'user',
      components: {
        default: Dashboard
      },
      children: [
        {
          path: 'list',
          name: 'userList',
          components: {
            default: User
          }
        }
      ]
    },
    {
      path: '/option',
      name: 'option',
      components: {
        default: Dashboard
      },
      children: [
        {
          path: 'list',
          name: 'optionGeneral',
          components: {
            default: OptionGeneral
          }
        },
        {
          path: 'create',
          name: 'optionComment',
          components: {
            default: OptionComment
          }
        },
        {
          path: 'create',
          name: 'optionAnalytic',
          components: {
            default: OptionAnalytic
          }
        },
      ]
    },
    {
      path: '/',
      redirect: '/dashboard'
    }
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
