import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(VueMeta)

import Footer from '../components/Footer'
import Pagination from '../components/Pagination'

Vue.component('my-footer', Footer)
Vue.component('pagination', Pagination)

// System.import is of ES6 module, which is designed to be statically analyzable
// It means that you can't write `let path = './main.js'; System.import(path)`
// Must use it by `System.import('./main.js')`
const CreatePostView = process.BROWSER ? type => resolve => {
  System.import('../views/CreatePostView').then(component => {
    const target = component(type)
    resolve(target)
  })
} : require('../views/CreatePostView')
const TagPager = process.BROWSER
  ? () => System.import('../components/TagPager')
  : require('../components/TagPager')
const Tag = process.BROWSER
  ? () => System.import('../components/Tag')
  : require('../components/Tag')
const BlogPager = process.BROWSER
  ? () => System.import('../components/BlogPager')
  : require('../components/BlogPager')
const Archive = process.BROWSER
  ? () => System.import('../components/Archive')
  : require('../components/Archive')

const Post = CreatePostView('post')
const Page = CreatePostView('page')

// How to get the chunk number in server-bundle ?
if (!process.BROWSER) {
  Post.chunkNumber = Page.chunkNumber = 0
  TagPager.chunkNumber = 1
  Tag.chunkNumber = 3
  BlogPager.chunkNumber = 2
  Archive.chunkNumber = 4
}
// console.log(CreatePostView)
// console.log(TagPager)
// console.log(Tag)
// console.log(BlogPager)
// console.log(Archive)

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
      component: Post
    },
    {
      path: '/tag/:tagName',
      name: 'tagPager',
      component: TagPager
    },
    {
      path: '/:page*',
      name: 'page',
      component: Page
    }
  ]
})
