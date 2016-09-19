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
      <tag-list  :current-route="currentRoute"  v-if=" currentRoute == '/tag/list' "></tag-list>
      <tag-create  :current-route="currentRoute"  v-if=" currentRoute == '/tag/create' "></tag-create>
      <cate-list :current-route="currentRoute"  v-if=" currentRoute == '/cate/list' "></cate-list>
      <cate-create  :current-route="currentRoute"  v-if=" currentRoute == '/cate/create' "></cate-create>
      <user-edit  :current-route="currentRoute"  v-if=" currentRoute == '/user/edit_pwd' "></user-edit>
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
import TagCreate from './components/TagCreate';
import CateCreate from './components/CateCreate';
import UserEdit from './components/UserEdit';

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
    TagCreate,
    CateCreate,
    UserEdit,
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
