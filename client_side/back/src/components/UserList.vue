<template>
      <div class="fk-content-wrap">
        <top :current-route="currentRoute"></top> 
        <div class="manage-container">
          <form
            model={this.state.tagInfo}
            class="user-create clearfix"
            onValidSubmit={this.handleValidSubmit.bind(this)}
          >
          <div class="pull-left">
            <div class="form-group">
                <label>用户名</label>
                <input
                    name="username"
                    class="form-control"
                    type="text"
                    label="标签名称"
                    placeholder="4到20个字符"
                    value={{this.state.tagInfo.name}}
                    validate="required"
                />
                <p className="help-block">登录时所用的名称，不能重复。</p>
            </div>
            <div class="form-group">
                <label>邮箱</label>
                <input
                    name="email"
                    class="form-control"
                    type="text"
                    label="标签名称"
                    placeholder="4到20个字符"
                    value={{this.state.tagInfo.name}}
                    validate="required"
                />
                <p className="help-block">用户主要联系方式，不能重复。</p>
            </div>
            <div class="form-group">
                <label>密码</label>
                <input
                    name="password"
                    class="form-control"
                    type="password"
                    label="标签名称"
                    value={{this.state.tagInfo.name}}
                    validate="required"
                />
                <p className="help-block">建议使用特殊字符与字母、数字的混编方式，增加安全性。</p>
            </div>
            <div class="form-group">
                <label>确认密码</label>
                <input
                    name="repassword"
                    class="form-control"
                    type="password"
                    label="标签名称"
                    value={{this.state.tagInfo.name}}
                    validate="required"
                />
                <button type="submit" {...props} class="btn btn-primary">{{ submitting ? '提交中...' : '提交'}}</button>
            </div>
          </div>
          <div class="pull-left">
            <div class="form-group">
                <label>别名</label>
                <input
                    name="display_name"
                    class="form-control"
                    type="text"
                    label="标签名称"
                    placeholder="显示名称"
                    value={{this.state.tagInfo.name}}
                    validate="required"
                />
                <p className="help-block">登录时所用的名称，不能重复。</p>
            </div>
            <div class="form-group">
                <label>用户名</label>
                <input
                    name="username"
                    class="form-control"
                    type="password"
                    label="标签名称"
                    placeholder="4到20个字符"
                    value={{this.state.tagInfo.name}}
                    validate="required"
                />
                <p className="help-block">登录时所用的名称，不能重复。</p>
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