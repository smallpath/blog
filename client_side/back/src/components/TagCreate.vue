<template>
      <div class="fk-content-wrap">
        <top :current-route="currentRoute"></top> 
        <div class="manage-container">
          <form
            model={this.state.tagInfo}
            class="tag-create clearfix"
            onValidSubmit={this.handleValidSubmit.bind(this)}
          >
            <div class="form-group">
                <label class="control-label col-xs-1">标签名称</label>
                <div class="col-xs-4">
                    <input
                        name="name"
                        class="form-control"
                        type="text"
                        label="标签名称"
                        value={{this.state.tagInfo.name}}
                        validate="required"
                    />
                </div>  
            </div>
            <div class="form-group">
                <label class="control-label col-xs-1">缩略名</label>
                <div class="col-xs-4">
                    <input
                        name="pathname"
                        type="text"
                        label="缩略名"
                        class="form-control"
                        value={{this.state.tagInfo.name}}
                        validate="required"
                    />
                </div>  
            </div>
            <div class="form-group col-xs-12">
              <button type="submit" {...props} class="btn btn-primary">{{ submitting ? '提交中...' : '提交'}}</button>
            </div>
          </form>
        </div>
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