<template>
      <div class="fk-content-wrap">
        <top :current-route="currentRoute"></top> 
        <div class="manage-container">
          <form
            model={this.state.tagInfo}
            class="user-editpwd clearfix"
            onValidSubmit={this.handleValidSubmit.bind(this)}
          >
          <div class="pull-left">
            <div class="form-group">
                <label>密码</label>
                <div class="form-group">
                    <input
                        name="password"
                        class="form-control"
                        type="password"
                        label="标签名称"
                        value={{this.state.tagInfo.name}}
                        validate="required"
                    />
                </div>  
            </div>
            <div class="form-group">
                <label>确认密码</label>
                <div class="form-group">
                    <input
                        name="repassword"
                        class="form-control"
                        type="password"
                        value={{this.state.tagInfo.name}}
                        validate="required"
                    />
                </div>  
            </div>
            <div class="form-group">
              <button type="submit" {...props} class="btn btn-primary">{{ submitting ? '提交中...' : '提交'}}</button>
            </div>
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