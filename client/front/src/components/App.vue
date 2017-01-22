<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <sidebar></sidebar>
    <my-header></my-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import LoadingBar from './Loading'

export default {
  components: {
    LoadingBar
  },
  computed: {
    progress () {
      return this.$store.state.progress
    }
  }
}

</script>