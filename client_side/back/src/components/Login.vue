<template>
  <div class="container">
    <div class="row">
      <div class="login">
        <h1 class="text-center">
          <a href="/">{{title}}</a>
        </h1>
        <Form class="clearfix" onValidSubmit={this.handleValidSubmit.bind(this)} onInvalidSubmit={this.handleInvalidSubmit.bind(this)}>
          <div class="form-group">
            <input type="text" name="username" ref="username" class="form-control" validate="required,isLength:4:20" placeholder="用户名"
            />
          </div>
          <div class="form-group">
            <input type="password" name="password" ref="password" class="form-control" validate="required,isLength:8:30" placeholder="密码"
              errorHelp={{ required: '请填写密码', isLength: '密码长度为8到30个字符' }} />
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-block">登录</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Smallpath的小站'
    }
  }
}
</script>

<style scoped>

</style>