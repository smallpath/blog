<template>
    <div class="fk-header clearfix" style='z-index: 1;'>
        <div class="pull-left">
            <ol class="breadcrumb">
                <li class="{{ true ? 'active': ''}}" v-if="routes[0] != ['dashboard']">
                    <a v-link="{ name: 'dashboard' }" @click='goToUrl("/dashboard", false)'>首页</a>
                </li>
                <template v-for="route in routes">
                    <li class="{{ true ? 'active': ''}}">
                        <a v-link="{ path: ($index == 0) ? '/' + route :'/' +  routes.join('/') }"
                            @click="goURL(routes, $index)" >{{ route == 'dashboard'? "首页": route }}</a>
                    </li>
                </template>
            </ol>
        </div>
        <ul class="nav navbar-nav navbar-right userinfo">
            <li :class="getUserClass()">
            <a @click="toggleUser" class="dropdown-toggle" data-toggle="dropdown">
                {{'smallpath'}} <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
                <li><a v-link="{ path: '/user/list' }" @click='goToUrl("/user/list", true)'>修改密码</a></li>
                <li><a v-link="{ path: '/admin/logout'}" @click='toggleUser'>退出</a></li>
            </ul>
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable */
import classnames from 'classnames';

export default {
  props:{
    shouldTipShow: Boolean,
    type: String,
    text: String,
    currentRoute: String,
  },
  computed: {
      routes () {
          let arr = this.currentRoute.split('/');
          arr = arr.filter(value=>{return value!=''});
          return arr;
      }
  },
  data () {
    return {
        isOpen: false,
    }
  },
  methods: {
    goToUrl(url, shouldToggle){
        if (shouldToggle)
            this.toggleUser();
        // this.currentRoute = url;
    },
    goURL(routes, $index){

        // if($index == 1)
        //     return;

        // let path = routes[0] == 'option' ? '/option/general' : 
        //             routes[0] == 'dashboard' ? '/dashboard' : '/' + routes[0] + '/list'; 
        // this.currentRoute = path
    },

    toggleUser(){
        this.isOpen = !this.isOpen;
    },
    getUserClass(){
        return classnames({
            dropdown: true,
            open: this.isOpen,
        })
    },
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
