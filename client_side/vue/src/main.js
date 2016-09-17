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

Vue.component('sidebar',Sidebar);
Vue.component('about',About);
Vue.component('my-header',Header);
Vue.component('my-footer',Footer);
Vue.component('blog-summary',BlogSummary);
Vue.component('blog-pager',BlogPager);
Vue.component('pagination',Pagination);

let router = new VueRouter()

router.map({
    '/about': {
        name:'about',
        component: About
    },
    '/': {
        name:'main',
        component: BlogPager,
    },
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})


router.redirect({
  '*': '/'
})

router.start(Vue.extend({}), '#app')

