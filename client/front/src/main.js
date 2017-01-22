import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from './store/index'

Vue.use(VueRouter)

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import BlogSummary from './components/BlogSummary'
import BlogPager from './components/BlogPager'
import Pagination from './components/Pagination'
import Archive from './components/Archive'
import Tag from './components/Tag'
import PostContainer from './components/PostContainer'
import Post from './components/Post'
import TagPager from './components/TagPager'
import Disqus from './components/Disqus'
import PageContainer from './components/PageContainer'
import Page from './components/Page'

let register = Vue.component.bind(Vue)

register('sidebar', Sidebar)
register('my-header', Header)
register('my-footer', Footer)
register('blog-summary', BlogSummary)
register('blog-pager', BlogPager)
register('pagination', Pagination)
register('archive', Archive)
register('blog-tag', Tag)
register('blog-post', Post)
register('post-container', Post)
register('page-container', PostContainer)
register('pager', Page)
register('tag-pager', TagPager)
register('disqus', Disqus)

import App from './components/App'
register('app', App)

let router = new VueRouter({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'main',
      component: BlogPager
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive
    },
    {
      path: '/tag',
      name: 'tag',
      component: Tag
    },
    {
      path: '/post/:pathName',
      name: 'post',
      component: PostContainer
    },
    {
      path: '/tag/:tagName',
      name: 'tagPager',
      component: TagPager
    },
    {
      path: '/:page',
      name: 'page',
      component: PageContainer
    }
  ]
})

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

let preFetchComponent = [
  Sidebar,
  Header
]

export { app, router, store, preFetchComponent }
