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