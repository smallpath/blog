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

// require.ensure can set the name of chunk, while import can't
const CreatePostView = process.BROWSER ? type => resolve => {
  require.ensure(['../views/CreatePostView'], (modules) => {
    return resolve(require('../views/CreatePostView')(type))
  }, 'CreatePostView')
} : require('../views/CreatePostView')
const TagPager = process.BROWSER
  ? () => new Promise((resolve) =>
    require.ensure(['../components/TagPager'], (modules) => {
      return resolve(require('../components/TagPager'))
    }, 'TagPager')
  )
  : require('../components/TagPager')
const Tag = process.BROWSER
  ? () => new Promise((resolve) =>
    require.ensure(['../components/Tag'], (modules) => {
      return resolve(require('../components/Tag'))
    }, 'Tag')
  )
  : require('../components/Tag')
const BlogPager = process.BROWSER
  ? () => new Promise((resolve) =>
    require.ensure(['../components/BlogPager'], (modules) => {
      return resolve(require('../components/BlogPager'))
    }, 'BlogPager')
  )
  : require('../components/BlogPager')
const Archive = process.BROWSER
  ? () => new Promise((resolve) =>
    require.ensure(['../components/Archive'], (modules) => {
      return resolve(require('../components/Archive'))
    }, 'Archive')
  )
  : require('../components/Archive')

const Post = CreatePostView('post')
const Page = CreatePostView('page')

if (!process.BROWSER) {
  Post.chunkName = Page.chunkName = 'CreatePostView'
  TagPager.chunkName = 'TagPager'
  Tag.chunkName = 'Tag'
  BlogPager.chunkName = 'BlogPager'
  Archive.chunkName = 'Archive'
}

export default new VueRouter({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
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
