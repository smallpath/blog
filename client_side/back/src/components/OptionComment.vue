<template>
  <div class="fk-content-wrap">
    <top :current-route="currentRoute"></top>
    <div class="manage-container">
      <form onsubmit="return false" class="clearfix options-comment">
        <div class="form-group"><label>评论类型</label>
          <div class="form-group">
            <div>
              <div class="">
                <div class="radio">
                  <label class="">
                    <input value="disqus" v-model="picked" name="type" class="" type="radio">
                    <span >Disqus</span>
                  </label>
                </div>
              </div>
              <div class="">
                <div class="radio">
                  <label class="">
                    <input value="duoshuo" v-model="picked" name="type" class="" type="radio">
                    <span >多说</span>
                  </label>
                </div>
              </div>
              <div class="">
                <div class="radio">
                  <label class="">
                    <input value="custom" v-model="picked" name="type" class="" type="radio">
                    <span>自定义</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group"><label><span>网站名称（</span><a>有疑问</a><span >）</span></label>
          <div class="form-group">
            <input value="smallpath" name="name" v-model="name" class="form-control" type="text"></div>
        </div><button type="submit" @click="submit" class="btn btn-primary" style="margin:20px 0 0 10px;">提交</button></form>
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
      picked: 'disqus',
      name: '',
      option: {},
    }
  },
  methods: {
    getOption(){
      store.fetchOption(this).then(result=>{
        let obj = {};
        result.forEach(value=>{
          obj[value.key] = value;
        })
        this.option = obj;

        let { type, name} = JSON.parse(obj['comment'].value);
        this.picked = type;
        this.name = name;

      })
    },
    submit(){
      let value = JSON.stringify({type: this.picked, name: this.name});
      store.patchOption(this,this.option['comment']._id,{ value }).then(result=>{
        console.log(value, result)
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