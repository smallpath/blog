<template>
  <div class="fk-content-wrap">
    <div class="manage-container">
      <form model={tagInfo} class="tag-create clearfix" onsubmit="return false">
        <div class="form-group">
          <label class="control-label col-xs-1">名称</label>
          <div class="col-xs-4">
            <input name="name" class="form-control" type="text" label="名称" v-model="name" validate="required" />
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-1">版本号</label>
          <div class="col-xs-4">
            <input name="version" type="text" label="版本号" v-model="version" class="form-control" validate="required" />
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-xs-1">下载链接</label>
          <div class="col-xs-4">
            <input name="link" type="text" label="下载链接" v-model="path" class="form-control" validate="required" />
          </div>
        </div>
        <div class="form-group col-xs-12">
          <button type="submit" @click="submitTag" class="btn btn-primary">{{ isSubmitting ? '提交中...' : '提交'}}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Top from './Top';
import Api from '../store/api';

export default {

  components: {
    Top,
  },
  props:{
    shouldTipShow: Boolean,
    tipType: String,
    tipInfo: String,
    currentRoute: String,
  },
  data () {
    return {
      name: '',
      path: '',
      version: '',
      id: '',
      isSubmitting: false,
    }
  },
  route: {
    data({ to }){
      if (typeof to.params.id == 'undefined'){
        return;
      }

      this.id = to.params.id;

      Api.fetchVersionById(this.id).then(result=>{
        this.name = result.name;
        this.path = result.path;
        this.version = result.version;
      })

    }

  },
  methods: {
    submitTag() {
      this.isSubmitting = true;

      this.tipInfo = "已成功提交";
      this.tipType = 'success'; 
      this.shouldTipShow = true;
      setTimeout(()=>{
          this.shouldTipShow = false;
          this.$router.go({ path: '/update/list' });
      }, 2000);

      if (this.id == ''){
        Api.newVersion({
          name: this.name,
          path: this.path,
          version: this.version,
        }).then(result=>{
          this.isSubmitting = false;
        });
      }else{
        Api.patchVersion(this.id,{
          name: this.name,
          path: this.path,
          version: this.version,
        }).then(result=>{
          this.isSubmitting = false;
        });
      }
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