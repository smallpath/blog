import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(VueMeta)

import Footer from '../components/Footer'
Vue.component('my-footer', Footer)

// Can't make a array reduce or the number of chunks will increase twice,
// because System.import is ES6 module, which requires a static module imports
const BlogPager = process.BROWSER
  ? () => System.import('../components/BlogPager')
  : require('../components/BlogPager')
const Archive = process.BROWSER
  ? () => System.import('../components/Archive')
  : require('../components/Archive')
const Tag = process.BROWSER
  ? () => System.import('../components/Tag')
  : require('../components/Tag')
const PostContainer = process.BROWSER
  ? () => System.import('../components/PostContainer')
  : require('../components/PostContainer')
const TagPager = process.BROWSER
  ? () => System.import('../components/TagPager')
  : require('../components/TagPager')
const PageContainer = process.BROWSER
  ? () => System.import('../components/PageContainer')
  : require('../components/PageContainer')

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
