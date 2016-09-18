<template>
  <div id="app">
    <template v-if="isLogin == false">
      <tip :should-tip-show="shouldTipShow" :type="'0'" :text="'wsssssw'"></tip>
      <login></login>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login'
import Tip from './components/Tip'

export default {

  components: {
    Login,
    Tip
  },

  data () {
    return {
      isLogin: false,
      shouldTipShow: false,
      SystemInfo: {}
    }
  }

}
</script>

<style>

</style>
