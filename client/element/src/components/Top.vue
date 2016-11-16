<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-col :span="24">
        
          
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
  name: 'sidebar',
  data () {
    return {
      title: '',
    }
  },
  methods: {
    handleSelect (index, indexPath) {
      if (index === '1-2') {
          this.$router.push({
              path: '/admin/logout'
          })
      } else if (index === '1-1') {
          this.$message('功能实现中');
      }
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
  li.el-submenu {
    float: right;
  }

</style>
