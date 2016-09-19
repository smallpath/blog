<template>
  <div class="fk-content-wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container" >
      <h3 style="margin-bottom:20px;">网站统计代码</h3>
      <form action="#" class="clearfix options-general">
        <div class="form-group">
          <div class="form-group"><textarea type="textarea" name="analyze_code" class="form-control form-control" style="height:240px;"></textarea></div>
          <p>直接贴入百度统计或者 Google 统计代码</p>
        </div><button type="submit" class="btn btn-primary">提交</button></form>
    </div>
</template>

<script>
/* eslint-disable */
import Top from './Top';

export default {

  components: {
    Top,
  },
  props:{
    shouldTipShow: Boolean,
    type: String,
    text: String,
    currentRoute: String,
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