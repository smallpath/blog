<template>
  <div class="dashboard">
    <top></top>
    <sidebar></sidebar>
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
.login {
  height: 100%;

  .row-bg {
    height: 100%;
  }
}
</style>
