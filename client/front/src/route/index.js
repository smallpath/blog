import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(VueMeta)

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import BlogSummary from '../components/BlogSummary'
import BlogPager from '../components/BlogPager'
import Pagination from '../components/Pagination'
import Archive from '../components/Archive'
import Tag from '../components/Tag'
import PostContainer from '../components/PostContainer'
import Post from '../components/Post'
import TagPager from '../components/TagPager'
import Disqus from '../components/Disqus'
import PageContainer from '../components/PageContainer'
import Page from '../components/Page'

let register = (name, component) => {
  Vue.component(name, component)
  return {
    then: register
  }
}

register('sidebar', Sidebar)
  .then('my-header', Header)
  .then('my-footer', Footer)
  .then('blog-summary', BlogSummary)
  .then('blog-pager', BlogPager)
  .then('pagination', Pagination)
  .then('archive', Archive)
  .then('blog-tag', Tag)
  .then('blog-post', Post)
  .then('post-container', Post)
  .then('page-container', PostContainer)
  .then('pager', Page)
  .then('tag-pager', TagPager)
  .then('disqus', Disqus)

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
