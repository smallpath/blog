<template>
  <div class="dashboard">
    <top></top>
    <sidebar></sidebar>
    <div class="main">
      <router-view :key="$route.params.id || -1"></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './pages/Sidebar'
import Top from './pages/Top'

export default {
  name: 'dashboard',
  data() {
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
    box-sizing: border-box;
    padding-bottom: 60px;
    position: fixed;
    top: 60px;
    left: 148px;
    height: 100%;
    width: -webkit-calc(100% - 148px);
    width:    -moz-calc(100% - 148px);
    width:         calc(100% - 148px);
    overflow: auto;
  }

  @media all and (max-width: 867px) {
    .main{
      left: 145px;
    }
  }
}

</style>
