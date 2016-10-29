/* eslint-disable */
// require('es6-promise').polyfill()

import './assets/res/js/base'
import { app, router ,store } from './main'


router.afterEach(function (route) {
    console.log(route);
	ga('send', {
	  hitType: 'pageview',
	  page: route.path,
	  location: window.location.origin + route.path,
	  title: route.name
	});
})

store.replaceState(window.__INITIAL_STATE__)

// actually mount to DOM
app.$mount('#app')


window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-86299315-1', 'auto');
ga('send', 'pageview');