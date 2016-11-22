/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store/index'
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'

Vue.use(Element)
Vue.use(VueRouter)

import createListView from './components/views/CreateListView'
import createEditView from './components/views/CreateEditView'

import App from './App'
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import Info from './components/pages/Info';
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
      },
      children: [
        {
          path: '/',
          name: 'info',
          components: {
            default: Info
          }
        }
      ]
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
          component: createListView({
            name: 'post',
            model: 'post',
            items: [
              {
                prop: 'title',
                label: '标题',
                width: 250
              },
              {
                prop: 'createdAt',
                label: '创建日期',
                width: 170
              },
              {
                prop: 'updatedAt',
                label: '修改日期',
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 0
              },
              sort: 1
            }
          })
        },
        {
          path: 'create/:id?',
          name: 'postCreate',
          components: {
            default: PostCreate
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
          component: createListView({
            name: 'page',
            model: 'post',
            items: [
              {
                prop: 'title',
                label: '标题',
                width: 250
              },
              {
                prop: 'createdAt',
                label: '创建日期',
                width: 170
              },
              {
                prop: 'updatedAt',
                label: '修改日期',
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 1
              }
            }
          })
        },
        {
          path: 'create/:id?',
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
          component: createListView({
            name: 'cate',
            model: 'category',
            items: [
              {
                prop: 'name',
                label: '名称',
                width: 250
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id?',
          name: 'cateCreate',
          component: createEditView({
            name: 'cate',
            model: 'category',
            items: [
              {
                prop: 'name',
                label: '名称',
                width: 250
              }
            ],
            query: {}
          })
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
          component: createListView({
            name: 'tag',
            model: 'tag',
            items: [
              {
                prop: 'name',
                label: '名称',
                width: 250
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id?',
          name: 'tagCreate',
          component: createEditView({
            name: 'tag',
            model: 'tag',
            items: [
              {
                prop: 'name',
                label: '名称',
                width: 250
              }
            ],
            query: {}
          })
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
          component: createListView({
            name: 'version',
            model: 'version',
            items: [
              {
                prop: 'name',
                label: '名称',
                width: 250
              },
              {
                prop: 'version',
                label: '版本',
                width: 170
              },
              {
                prop: 'path',
                label: '链接',
                width: 170
              }
            ],
            query: {}
          })
        },
        {
          path: 'create/:id?',
          name: 'versionCreate',
          component: createEditView({
            name: 'version',
            model: 'version',
            items: [
              {
                prop: 'name',
                label: '名称',
                default: '',
                width: 250
              },
              {
                prop: 'version',
                label: '版本',
                default: '',
                width: 170
              },
              {
                prop: 'path',
                label: '链接',
                default: '',
                width: 170
              }
            ],
            query: {}
          })
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
          path: '/',
          name: 'userList',
          component: createEditView({
            name: 'user',
            model: 'user',
            isPlain: true,
            items: [
              {
                prop: 'name',
                label: '名称',
                default: '',
                width: 250
              },
              {
                prop: 'password',
                label: '密码',
                default: '',
                width: 170
              },
              {
                prop: 'displayName',
                label: '昵称',
                default: '',
                width: 170
              },
              {
                prop: 'email',
                label: '邮箱',
                default: '',
                width: 170
              },
              {
                prop: 'imageToken',
                label: '七牛Token',
                default: '',
                width: 170
              }
            ],
            query: {}
          })
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
          path: 'general',
          name: 'optionGeneral',
          component: createEditView({
            name: 'general',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'title',
                label: '网站名称',
                default: '',
                width: 250
              },
              {
                prop: 'logoUrl',
                label: 'logo地址',
                default: '',
                width: 170
              },
              {
                prop: 'description',
                label: '站点描述',
                default: '',
                width: 170
              },
              {
                prop: 'siteUrl',
                label: '网站地址',
                default: '',
                width: 170
              },
              {
                prop: 'faviconUrl',
                label: 'favicon地址',
                default: '',
                width: 170
              },
              {
                prop: 'keywords',
                label: '关键词',
                default: '',
                width: 170
              },
              {
                prop: 'githubUrl',
                label: 'github地址',
                default: '',
                width: 170
              },
              {
                prop: 'weiboUrl',
                label: '微博地址',
                default: '',
                width: 170
              },
              {
                prop: 'miitbeian',
                label: '网站备案号',
                default: '',
                width: 170
              }
            ],
            query: {}
          })
        },
        {
          path: 'comment',
          name: 'optionComment',
          component: createEditView({
            name: 'comment',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'commentType',
                label: '评论类型',
                default: '',
                width: 250
              },
              {
                prop: 'commentName',
                label: '评论名称',
                default: '',
                width: 250
              }
            ],
            query: {}
          })
        },
        {
          path: 'analytic',
          name: 'optionAnalytic',
          component: createEditView({
            name: 'analytic',
            model: 'option',
            isPlain: true,
            items: [
              {
                prop: 'analyzeCode',
                label: '统计代码',
                default: '',
                width: 250
              }
            ],
            query: {}
          })
        },
      ]
    },
    {
      path: '/',
      redirect: '/dashboard'
    }
  ]
})

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')

export { app, router, store }
