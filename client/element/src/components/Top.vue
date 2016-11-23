<template>
  <div class="top">
    <el-row class="tac">
      <el-col :span="24">

        <!--<el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>-->
          
        <el-menu default-active="1" mode="horizontal" class="el-menu-vertical-demo" :unique-opened="true"
                 theme="dark" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">你好</template>
            <el-menu-item index="1-1">修改密码</el-menu-item>
            <el-menu-item index="1-2">退出</el-menu-item>
          </el-submenu>
          

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Api from '../store/api'

export default {
  name: 'top',
  data () {
    return {
      title: '',
    }
  },
  methods: {
    handleSelect (index, indexPath) {
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
  mounted(){

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
