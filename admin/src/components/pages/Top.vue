<template>
  <div class="top">
    <el-row class="tac">
      <el-col :span="24">
          
        <el-menu default-active="1" mode="horizontal" class="el-menu-vertical-demo" :unique-opened="true"
                 theme="dark" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">{{displayName === -1 ? '未登录' : displayName}}</template>
            <el-menu-item index="1-1">修改密码</el-menu-item>
            <el-menu-item index="1-2">退出</el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'top',
  data() {
    return {
      title: ''
    }
  },
  computed: {
    displayName() {
      return this.$store.state.user.displayName || -1
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      if (index === '1-1') {
        this.$router.push({
          name: 'userEdit'
        })
      } else if (index === '1-2') {
        this.$router.push({
          name: 'logout'
        })
      }
    }
  },
  created() {
    if (this.displayName === -1) {
      let username = window.localStorage.getItem('username')
      this.$store.dispatch('FETCH_USER', {
        model: 'user',
        query: {},
        username
      }).catch((err) => console.error(err))
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-breadcrumb {
    position: relative;
    left: 20px;
    float: left;
    z-index: 1;
    line-height: 60px;
    font-size: 14px;
  }

  li.el-submenu {
    float: right;
  }

</style>
