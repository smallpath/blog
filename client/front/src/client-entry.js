require('es6-promise').polyfill()
import { app } from './main'

// actually mount to DOM
app.$mount('#app')
