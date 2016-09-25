<template>
  <div id="app">
      <sidebar :current-route.sync="currentRoute"></sidebar>
      <top :current-route.sync="currentRoute"></top>
      <tip :should-tip-show="shouldTipShow" :tip-info="tipInfo" :tip-type="tipType"></tip>
      <router-view 
        :current-route.sync="currentRoute" 
        :should-tip-show.sync="shouldTipShow" 
        :tip-info.sync="tipInfo"
        :tip-type.sync="tipType">
      </router-view>
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
      shouldTipShow: true,
      tipInfo: '',
      tipType: 'alert',
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
