<template>
  <div>
    <div v-if="shouldTipShow == true" class="fk-alert alert alert-{{type}}">{{text}}</div>
    <div v-else></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props:{
    shouldTipShow: Boolean,
    type: String,
    text: String,
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
