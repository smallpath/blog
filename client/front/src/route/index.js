import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(VueMeta)

import Footer from '../components/Footer'
import BlogSummary from '../components/BlogSummary'
import Pagination from '../components/Pagination'
import CreatePostView from '../views/CreatePostView'

Vue.component('my-footer', Footer)
Vue.component('blog-summary', BlogSummary)
Vue.component('pagination', Pagination)

const BlogPager = require('../components/BlogPager')
const Archive = require('../components/Archive')
const Tag = require('../components/Tag')

// System.import is of ES6 module, which is designed to be statically analyzable
// It means that you can't write `let path = './main.js'; System.import(path)`
// Must use it by `System.import('./main.js')`
const TagPager = process.BROWSER
  ? () => System.import('../components/TagPager')
  : require('../components/TagPager')

export default new VueRouter({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      let position = {x: 0, y: 0}
      if (to.hash) {
        position = { selector: to.hash }
      }
      return position
    }
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
      component: CreatePostView('post')
    },
    {
      path: '/tag/:tagName',
      name: 'tagPager',
      component: TagPager
    },
    {
      path: '/:page*',
      name: 'page',
      component: CreatePostView('page')
    }
  ]
})
