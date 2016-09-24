<template>
      <div class="fk-content-wrap">
        <div class="manage-container">
          <form
            class="user-create clearfix"
            onsubmit="return false"
          >
          <div class="pull-left">
            <div class="form-group">
                <label>用户名</label>
                <input
                    name="username"
                    class="form-control"
                    type="text"
                    v-model="user.name"
                    placeholder="4到20个字符"
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
                    v-model="user.email"
                    placeholder="4到20个字符"
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
                    v-model="user.password"
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
                    v-model="repassword"
                    validate="required"
                />
            </div>
            <button type="submit" @click="submit" class="btn btn-primary">{{ submitting ? '提交中...' : '提交'}}</button>
          </div>
          <div class="pull-left">
            <div class="form-group">
                <label>别名</label>
                <input
                    name="display_name"
                    class="form-control"
                    type="text"
                    placeholder="显示名称"
                    v-model="user.displayName"
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
        user: {},
        repassword: '',
    }
  },
  methods: {
    getUser(){
      store.fetchUser(this).then(result=>{
          console.log(result);
        this.user = result[0];
      })
    },
    submit(){

        if(this.user.password != this.repassword)
            return;

      store.patchUser(this,this.user._id,this.user).then(result=>{

      })

    }
  },
  ready () {
    this.getUser();
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>