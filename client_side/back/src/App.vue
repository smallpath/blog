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
      <post-create :current-route="currentRoute"  v-if=" currentRoute == '/post/create' "></post-create>
      <page-list :current-route="currentRoute"  v-if=" currentRoute == '/page/list' "></page-list>
      <page-create :current-route="currentRoute"  v-if=" currentRoute == '/page/create' "></page-create>
      <tag-list  :current-route="currentRoute"  v-if=" currentRoute == '/tag/list' "></tag-list>
      <tag-create  :current-route="currentRoute"  v-if=" currentRoute == '/tag/create' "></tag-create>
      <cate-list :current-route="currentRoute"  v-if=" currentRoute == '/cate/list' "></cate-list>
      <cate-create  :current-route="currentRoute"  v-if=" currentRoute == '/cate/create' "></cate-create>
      <user-edit  :current-route="currentRoute"  v-if=" currentRoute == '/user/edit_pwd' "></user-edit>
      <user-list  :current-route="currentRoute"  v-if=" currentRoute == '/user/list' "></user-list>
      <option-general  :current-route="currentRoute"  v-if=" currentRoute == '/option/general' "></option-general>
      <option-comment  :current-route="currentRoute"  v-if=" currentRoute == '/option/comment' "></option-comment>
      <option-analytic  :current-route="currentRoute"  v-if=" currentRoute == '/option/analytic' "></option-analytic>
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
import PostCreate from './components/PostCreate';
import PageList from './components/PageList';
import PageCreate from './components/PageCreate';
import TagList from './components/TagList';
import CateList from './components/CateList';
import TagCreate from './components/TagCreate';
import CateCreate from './components/CateCreate';
import UserEdit from './components/UserEdit';
import UserList from './components/UserList';
import OptionGeneral from './components/OptionGeneral';
import OptionComment from './components/OptionComment';
import OptionAnalytic from './components/OptionAnalytic';

export default {

  components: {
    Login,
    Tip,
    Sidebar,
    Dashboard,
    PostList,
    PostCreate,
    PageList,
    PageCreate,
    TagList,
    CateList,
    TagCreate,
    CateCreate,
    UserEdit,
    UserList,
    OptionGeneral,
    OptionComment,
    OptionAnalytic,
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
