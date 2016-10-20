<template>
    <div id="app">
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
/* eslint-disable */

export default {
  mounted (){

  }
}

</script>