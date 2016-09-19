<template>
  <div class="fk-content-wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <form action="#" class="clearfix options-comment">
        <div class="form-group"><label>评论类型</label>
          <div class="form-group">
            <div>
              <div class="">
                <div class="radio"><label class=""><input value="disqus" label="Disqus" checked="" name="type" class="" type="radio"><span >Disqus</span></label></div>
              </div>
              <div class="">
                <div class="radio"><label class=""><input value="duoshuo" label="多说" name="type" class="" type="radio"><span >多说</span></label></div>
              </div>
              <div class="">
                <div class="radio"><label class=""><input value="custom" label="自定义" name="type" class="" type="radio"><span>自定义</span></label></div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group"><label><span>网站名称（</span><a>有疑问</a><span >）</span></label>
          <div class="form-group"><input value="smallpath" name="name" class="form-control" type="text"></div>
        </div><button type="submit" class="btn btn-primary" style="margin:20px 0 0 10px;">提交</button></form>
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