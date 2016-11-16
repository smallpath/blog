<template>
  <div id="app">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;

  #app {
    height: 100%;
  }
}

</style>
