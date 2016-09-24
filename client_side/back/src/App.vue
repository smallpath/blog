<template>
  <div id="app">
      <sidebar :current-route.sync="currentRoute"></sidebar>
      <top :current-route.sync="currentRoute"></top> 
    <router-view :current-route.sync="currentRoute"></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import Login from './components/Login'
import Tip from './components/Tip'
import Sidebar from './components/Sidebar'
import Top from './components/Top'

export default {

  components: {
    Login,
    Tip,
    Sidebar,
    Top,
  },

  data () {
    return {
      isLogin: true,
      shouldTipShow: false,
      SystemInfo: {},
      currentRoute: '/dashboard'
    }
  },
  ready(){

  }

}
</script>

<style>

</style>
