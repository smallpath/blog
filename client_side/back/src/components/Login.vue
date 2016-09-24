<template>
  <div class="container">
    <div class="row">
      <div class="login">
        <h1 class="text-center">
          <a href="/">{{title}}</a>
        </h1>
        <form class="clearfix" onsubmit="return false">
          <div class="form-group">
            <input type="text" name="username" v-model="username" class="form-control" placeholder="用户名"
            />
          </div>
          <div class="form-group">
            <input type="password" name="password" v-model="password" class="form-control" placeholder="密码"
              errorHelp={{ required: '请填写密码', isLength: '密码长度为8到30个字符' }} />
          </div>
          <button type="submit" @click="login" class="btn btn-primary btn-lg btn-block">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import store from '../store/index';

export default {
  data () {
    return {
      title: 'Smallpath的小站',
      username: '',
      password: '',
    }
  },
  methods: {
    login(){
      let json = {
        name: this.username,
        password: this.password
      };
      store.login(this, json).then(response=>{
        if (response.body.status == 'fail'){
          
        }else if(response.body.status == 'success'){
          localStorage.setItem('token', response.body.token);
          localStorage.setItem('username',this.username);
          this.$router.go({path: '/dashboard' });
        }

      });

    }
  },
  ready(){
    store.fetchOptionByJSON(this, { key: 'title' }).then(result=>{
      this.title = result[0].value || '';
    })
  }
}
</script>

<style scoped>

</style>