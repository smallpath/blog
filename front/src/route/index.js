import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(VueMeta)

import Footer from '../components/Footer'
import Pagination from '../components/Pagination'

Vue.component('my-footer', Footer)
Vue.component('pagination', Pagination)

import {
  Post,
  Page,
  TagPager,
  Tag,
  BlogPager,
  Archive
} from 'create-route'

export default function createRouter() {
  return new VueRouter({
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
}
