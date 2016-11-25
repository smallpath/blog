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
import Sidebar from './pages/Sidebar'
import Top from './pages/Top'

export default {
  name: 'dashboard',
  data () {
    return {
      title: ''
    }
  },
  components: {
    Sidebar,
    Top
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
    width: 83.33333%;
    height: 100%;
    overflow: auto;
  }

  @media all and (max-width: 867px) {
    .main{
      left: 145px;
    }
  }
}

</style>
