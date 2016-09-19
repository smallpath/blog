<template>
  <div id="app">
    <template v-if="isLogin == false">
      <tip :should-tip-show="shouldTipShow" :type="'success'" :text="'wsssssw'"></tip>
      <login></login> 
    </template>
    <template v-else>
      <sidebar :current-route.sync="currentRoute"></sidebar>
      <dashboard :current-route="currentRoute"  v-if=" currentRoute.indexOf('/dashboard') > -1 "></dashboard>
      <post-list :current-route="currentRoute"  v-if=" currentRoute == '/post/list' "></post-list>
      <page-list :current-route="currentRoute"  v-if=" currentRoute == '/page/list' "></page-list>
      <cate-list :current-route="currentRoute"  v-if=" currentRoute == '/cate/list' "></cate-list>
      <tag-list  :current-route="currentRoute"  v-if=" currentRoute == '/tag/list' "></tag-list>
      <tip :should-tip-show="shouldTipShow" :type="'success'" :text="'wsssssw'"></tip>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import Login from './components/Login'
import Tip from './components/Tip'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard';
import PostList from './components/PostList';
import PageList from './components/PageList';
import TagList from './components/TagList';
import CateList from './components/CateList';

export default {

  components: {
    Login,
    Tip,
    Sidebar,
    Dashboard,
    PostList,
    PageList,
    TagList,
    CateList,
  },

  data () {
    return {
      isLogin: true,
      shouldTipShow: false,
      SystemInfo: {},
      currentRoute: '/dashboard'
    }
  }

}
</script>

<style>

</style>
