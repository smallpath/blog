/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import About from './components/home/About'
import Header from './components/home/Header'
import Sidebar from './components/home/Sidebar'
import Footer from './components/home/Footer'
import BlogSummary from './components/home/BlogSummary'
import BlogPager from './components/home/BlogPager'
import Pagination from './components/home/Pagination'
import Archive from './components/home/Archive'
import Tag from './components/home/Tag'
import Post from './components/home/Post'

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

let router = new VueRouter()

router.map({
    '/': {
        name:'main', 
        component: BlogPager
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
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})


router.redirect({
  '*': '/'
})

router.start(Vue.extend({}), '#app')

