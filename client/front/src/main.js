/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

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

Vue.component('sidebar',Sidebar);
Vue.component('about',About);
Vue.component('my-header',Header);
Vue.component('my-footer',Footer);
Vue.component('blog-summary',BlogSummary);
Vue.component('blog-pager',BlogPager);
Vue.component('pagination',Pagination);
Vue.component('archive',Archive);
Vue.component('blog-tag',Tag);
Vue.component('blog-post',Post);
Vue.component('tag-pager',TagPager);

let router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  transitionOnLoad: true,
})

router.map({
    '/': {
        name:'main', 
        component: BlogPager,
    },
    '/archive': {
        name: 'archive',
        component: Archive
    },
    '/tag': {
        name: 'tag',
        component: Tag,
    },
    '/about': {
        name:'about',
        component: About
    },
    '/post/:pathName': {
        name:'post',
        component: Post 
    },
    '/tag/:tagName': {
        name:'tagPager',
        component: TagPager 
    },
})

router.beforeEach(function () {
//   window.scrollTo(0, 0)
})


router.redirect({
  '*': '/'
})

router.start(Vue.extend({}), '#app')

