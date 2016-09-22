<template>
  <div class="fk-content-wrap">
    <div class="manage-container">
      <form onsubmit="return false" class="clearfix options-general">
        <div class="form-group"><label>站点名称</label>
          <div class="form-group"><input name="title" v-model="title" class="form-control form-control" type="text"></div>
        </div>
        <div class="form-group"><label>LOGO 地址</label><img src="{{site_url}}/static/upload/201605/logo.png?m=1474296766757" alt="logo" style="display:block;margin-bottom:10px;"
            height="140px" width="140px">
          <div class="form-group"><input name="logo_url" v-model="logo_url" class="form-control form-control" type="text"></div>
          <p class="help-block"><span>尺寸最好为 140x140px。</span><button type="button" class="btn btn-default"><span ></span><span >上传</span></button>
            <input style="display:none;" accept="image/*" type="file"></p>
        </div>
        <div class="form-group"><label>站点描述</label>
          <div class="form-group"><input name="description" v-model="description" class="form-control form-control" type="text"></div>
        </div>
        <div class="form-group"><label>网站地址</label>
          <div class="form-group"><input name="site_url" v-model="site_url" class="form-control form-control" type="text"></div>
        </div>
        <div class="form-group"><label>Favicon 地址</label><img src="{{site_url}}/favicon.ico?m=1474296766757" alt="logo" style="display:block;margin-bottom:10px;max-width:128px;max-height:128px;">
          <div class="form-group"><input name="favicon_url" v-model="favicon_url" class="form-control form-control" type="text"></div>
          <p class="help-block"><span>尺寸最好为 128x128px。</span><button type="button" class="btn btn-default"><span></span><span >上传</span></button>
            <input style="display:none;" accept="image/x-icon" type="file"></p>
        </div>
        <div class="form-group"><label>关键词</label>
          <div class="form-group"><input name="keywords" v-model="keywords" class="form-control form-control" type="text"></div>
          <p class="help-block">请以半角逗号 "," 分割多个关键字.</p>
        </div>
        <div class="form-group"><label>GitHub 地址</label>
          <div class="form-group"><input name="github_url" v-model="github_url" class="form-control form-control" type="text"></div>
        </div>
        <div class="form-group"><label>Twitter 地址</label>
          <div class="form-group"><input name="twitter_url" v-model="twitter_url" class="form-control form-control" type="text"></div>
        </div>
        <div class="form-group"><label>网站备案号</label>
          <div class="form-group"><input name="miitbeian" v-model="miitbeian" class="form-control form-control" " type="text "></div>
    </div>
    <button type="submit " @click="submit" class="btn btn-primary "">提交</button>
      </form>
      </div>
</template>

<script>
/* eslint-disable */
import Top from './Top';
import store from '../store/index';

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
      option: {},
      title: '',
      logo_url:'',
      description: '',
      site_url: '',
      favicon_url: '',
      keywords: '',
      twitter_url: '',
      github_url: '',
      github_blog: '',
      miitbeian: '',

      image_upload: '',
    }
  },
  methods: {
    getOption(){
      store.fetchOption(this).then(result=>{
        let obj = {};
        result.forEach(value=>{
          obj[value.key] = value;
          if (typeof this[value.key] != 'undefined'){
            this[value.key] = value.value;
          }
        })
        this.option = obj;
      })
    },
    submit(){
      Object.keys(this.option).forEach(name=>{
        let value = this.option[name];

        if (typeof this[value.key] == 'undefined')
          return;
        
        if (this[value.key] == value.value)
          return;

        store.patchOption(this,value._id,{ value : this[value.key] }).then(result=>{
          value.value = this[value.key];
        })

      })

      


    }
  },
  ready () {
    this.getOption();
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
  h1 {
    color: #42b983;
  }
</style>