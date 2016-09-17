/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import App from './App'
import Hello from './components/Hello'
import About from './components/About'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import BlogSummary from './components/BlogSummary'
import BlogPager from './components/BlogPager'
import Pagination from './components/Pagination'

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
        params: {
            page: 1,
        }
    },
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})


router.redirect({
  '*': '/'
})

router.start(Vue.extend({}), '#app')

