/* eslint-disable */
// require('es6-promise').polyfill()

import './assets/res/js/base'
import { app, router, store } from './main'

store.replaceState(window.__INITIAL_STATE__)

// actually mount to DOM
app.$mount('#app')

if (window.__INITIAL_STATE__.siteInfo) {
	let analyze_code = window.__INITIAL_STATE__.siteInfo.analyze_code;
	if (analyze_code && analyze_code.value !== '') {
		// init google analytics
		window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
		ga('create', analyze_code.value, 'auto');
		ga('send', 'pageview');

		// send google analytics when routes change
		router.afterEach((route) => {
			ga('send', {
				hitType: 'pageview',
				page: route.path,
				location: window.location.origin + route.path,
				title: route.name || ''
			});
		})
	}
}
