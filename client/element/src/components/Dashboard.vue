<template>
  <div class="dashboard">
    <top></top>
    <sidebar></sidebar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Api from '../store/api'
import Sidebar from './Sidebar'
import Top from './Top'

export default {
  name: 'dashboard',
  data () {
    return {
      title: ''
    }
  },
  components: {
    'sidebar': Sidebar,
    'top': Top
  },
  methods: {
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  height: 100%;

  .main {
    position: fixed;
    top: 60px;
    left: 16.66667%;
    width: 100%;
    height: 100%;
  }
}
</style>
