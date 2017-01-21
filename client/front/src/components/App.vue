<template>
  <div id="app">
    <loading-bar
      :on-progress-done="onProgressDone"
      :progress="progress">
    </loading-bar>
    <keep-alive>
        <router-view name="sidebar"></router-view>
    </keep-alive>
    <keep-alive>
        <router-view name="header"></router-view>
    </keep-alive>
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
  },
  methods: {
    onProgressDone () {}
  }
}

</script>