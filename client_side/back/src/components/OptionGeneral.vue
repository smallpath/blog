<template>
  <div class="fk-content-wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <form action="#" class="clearfix options-general">
        <div class="form-group"><label>站点名称</label>
          <div class="form-group" ><input name="title" value="Smallpath的小站" class="form-control form-control"
              type="text"></div>
        </div>
        <div class="form-group"><label >LOGO 地址</label><img src="/static/upload/201605/logo.png?m=1474296766757"
            alt="logo" style="display:block;margin-bottom:10px;"  height="140px" width="140px">
          <div
            class="form-group" ><input name="logo_url" value="/static/upload/201605/logo.png" class="form-control form-control" 
              type="text"></div>
        <p class="help-block" ><span >尺寸最好为 140x140px。</span><button type="button" class="btn btn-default"
            ><span ></span><span >上传</span></button>
          <input
            style="display:none;" accept="image/*" type="file"></p>
    </div>
    <div class="form-group" ><label >站点描述</label>
      <div class="form-group"><input name="description" value="秋风小径" class="form-control form-control"
          type="text"></div>
    </div>
    <div class="form-group" ><label >网站地址</label>
      <div class="form-group"><input name="site_url" value="http://smallpath.me" class="form-control form-control"
          type="text"></div>
    </div>
    <div class="form-group"><label >Favicon 地址</label><img src="/favicon.ico?m=1474296766757" alt="logo" style="display:block;margin-bottom:10px;max-width:128px;max-height:128px;"
        >
      <div class="form-group"><input name="favicon_url" value="/favicon.ico" class="form-control form-control" 
          type="text"></div>
      <p class="help-block"><span>尺寸最好为 128x128px。</span><button type="button" class="btn btn-default"
          ><span></span><span >上传</span></button>
        <input
          style="display:none;" accept="image/x-icon"  type="file"></p>
    </div>
    <div class="form-group" ><label>关键词</label>
      <div class="form-group"><input name="keywords" value="秋风小径,smallpath" class="form-control form-control" 
          type="text"></div>
      <p class="help-block">请以半角逗号 "," 分割多个关键字.</p>
    </div>
    <div class="form-group"><label>GitHub 地址</label>
      <div class="form-group"><input name="github_url" value="https://github.com/Smallpath" class="form-control form-control"
          type="text"></div>
    </div>
    <div class="form-group"><label>Twitter 地址</label>
      <div class="form-group"><input name="twitter_url" value="" class="form-control form-control"
          type="text"></div>
    </div>
    <div class="form-group"><label>网站备案号</label>
      <div class="form-group" ><input name="miitbeian" value="" class="form-control form-control"" type="text"></div>
    </div><button type="submit" class="btn btn-primary"">提交</button>
    </form>
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