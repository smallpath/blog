import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store/index'

Vue.use(VueRouter)

import About from './components/About'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import BlogSummary from './components/BlogSummary'
import BlogPager from './components/BlogPager'
import Pagination from './components/Pagination'
import Archive from './components/Archive'
import Tag from './components/Tag'
import Post from './components/Post'
import TagPager from './components/TagPager'
import Disqus from './components/Disqus'

Vue.component('sidebar', Sidebar)
Vue.component('about', About)
Vue.component('my-header', Header)
Vue.component('my-footer', Footer)
Vue.component('blog-summary', BlogSummary)
Vue.component('blog-pager', BlogPager)
Vue.component('pagination', Pagination)
Vue.component('archive', Archive)
Vue.component('blog-tag', Tag)
Vue.component('blog-post', Post)
Vue.component('tag-pager', TagPager)
Vue.component('disqus', Disqus)

import App from './components/App'
Vue.component('app', App)

let router = new VueRouter({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'main',
      components: {
        default: BlogPager,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/archive',
      name: 'archive',
      components: {
        default: Archive,
        sidebar: Sidebar,
        header: Header
      }

    },
    {
      path: '/tag',
      name: 'tag',
      component: Tag,
      components: {
        default: Tag,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
        default: About,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/post/:pathName',
      name: 'post',
      components: {
        default: Post,
        sidebar: Sidebar,
        header: Header
      }
    },
    {
      path: '/tag/:tagName',
      name: 'tagPager',
      components: {
        default: TagPager,
        sidebar: Sidebar,
        header: Header
      }
    }
  ]
})

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
