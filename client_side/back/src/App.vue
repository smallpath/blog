<template>
  <div id="app">
    <template v-if="isLogin == false">
      <tip :should-tip-show="shouldTipShow" :type="'success'" :text="'wsssssw'"></tip>
      <login></login>
    </template>
    <template v-else>
      <sidebar :current-route.sync="currentRoute"></sidebar>
      <dashboard v-if=" currentRoute.indexOf('/dashboard') > -1 "></dashboard>
      <tip :should-tip-show="shouldTipShow" :type="'success'" :text="'wsssssw'"></tip>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import Login from './components/Login'
import Tip from './components/Tip'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard';

export default {

  components: {
    Login,
    Tip,
    Sidebar,
    Dashboard,
  },

  data () {
    return {
      isLogin: true,
      shouldTipShow: false,
      SystemInfo: {},
      currentRoute: '/dashboard'
    }
  }

}
</script>

<style>

</style>
