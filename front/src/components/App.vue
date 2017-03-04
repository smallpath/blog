<template>
  <div id="app">
    <loading-bar :progress="progress"></loading-bar>
    <sidebar></sidebar>
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from '../store/vuex'
import Sidebar from './Sidebar'
import LoadingBar from '../components/Loading'
import MyHeader from '../components/Header'

export default {
  components: {
    LoadingBar,
    Sidebar,
    MyHeader
  },
  computed: {
    ...mapGetters([
      'progress'
    ])
  }
}
</script>