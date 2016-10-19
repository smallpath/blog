/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import store from './store/index'

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

Vue.component('sidebar', Sidebar);
Vue.component('about', About);
Vue.component('my-header', Header);
Vue.component('my-footer', Footer);
Vue.component('blog-summary', BlogSummary);
Vue.component('blog-pager', BlogPager);
Vue.component('pagination', Pagination);
Vue.component('archive', Archive);
Vue.component('blog-tag', Tag);
Vue.component('blog-post', Post);
Vue.component('tag-pager', TagPager);

import App from './components/App'
Vue.component('app', App);

let router = new VueRouter({
    mode: 'history',
    scrollBehavior: function (to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'main',
            component: BlogPager,
        },
        {
            path: '/archive',
            name: 'archive',
            component: Archive
        },
        {
            path: '/tag',
            name: 'tag',
            component: Tag,
        },
        {
            path: '/about',
            name: 'about',
            component: About
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
    ],
})

sync(store, router)

const app = new Vue({
    router,
    store,
    ...App,
    // render: h => h(App)
})



// Object.keys(app).map(value=>console.log(value))

export { app, router, store }
