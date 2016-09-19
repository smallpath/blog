<template>
  <div id="app">
    <template v-if="isLogin == false">
      <tip :should-tip-show="shouldTipShow" :type="'success'" :text="'wsssssw'"></tip>
      <login></login>
    </template>
    <template v-else>
      <sidebar :current-route.sync="'/dashboard'"></sidebar>
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

export default {

  components: {
    Login,
    Tip,
    Sidebar
  },

  data () {
    return {
      isLogin: true,
      shouldTipShow: false,
      SystemInfo: {}
    }
  }

}
</script>

<style>

</style>
