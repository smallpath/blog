<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <sidebar></sidebar>
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoadingBar from './Loading'

export default {
  components: {
    LoadingBar
  },
  computed: {
    ...mapGetters([
      'progress'
    ])
  }
}
</script>