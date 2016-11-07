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
               />
          </div>
          <button type="submit" @click="login" class="btn btn-primary btn-lg btn-block">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Api from '../store/api';

export default {
  data () {
    return {
      title: '',
      username: '',
      password: '',
    }
  },
  methods: {
    login(){
      Api.login({
        name: this.username,
        password: this.password
      }).then(response=>{
        if (response.data.status == 'fail'){
          
        }else if(response.data.status == 'success'){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username',this.username);
          this.$router.go({path: '/dashboard' });
        }
      });

    }
  },
  ready(){
    Api.fetchOption({ key: 'title' }).then(result=>{
      this.title = result[0].value || '';
    })
  }
}
</script>

<style scoped>

</style>