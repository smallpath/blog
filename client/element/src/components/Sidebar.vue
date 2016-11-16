<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-col :span="4">
        <!--<h5>带 icon</h5>-->
          
        <el-menu default-active="2" class="el-menu-vertical-demo" :unique-opened="true"
                  @select="handleSelect">
          <el-menu-item index="1"><i class="el-icon-menu"></i>概述</el-menu-item>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>文章管理</template>
            <el-menu-item index="2-1">文章列表</el-menu-item>
            <el-menu-item index="2-2">添加文章</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-document"></i>页面管理</template>
            <el-menu-item-group title="页面管理">
              <el-menu-item index="3-1">页面列表</el-menu-item>
              <el-menu-item index="3-2">添加页面</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="前端管理">
              <el-menu-item index="3-3">页面设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>分类管理</template>
            <el-menu-item index="4-1">分类列表</el-menu-item>
            <el-menu-item index="4-2">添加分类</el-menu-item>
          </el-submenu>
          
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-star-on"></i>标签管理</template>
            <el-menu-item index="5-1">标签列表</el-menu-item>
            <el-menu-item index="5-2">添加标签</el-menu-item>
          </el-submenu>
          
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-message"></i>版本管理</template>
            <el-menu-item index="6-1">版本列表</el-menu-item>
            <el-menu-item index="6-2">添加版本</el-menu-item>
          </el-submenu>
          
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-star-off"></i>用户管理</template>
            <el-menu-item index="7-1">用户设置</el-menu-item>
            <el-menu-item index="7-2">其他设置</el-menu-item>
          </el-submenu>
          
          <el-submenu index="8">
            <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
            <el-menu-item index="8-1">基本设置</el-menu-item>
            <el-menu-item index="8-2">评论设置</el-menu-item>
            <el-menu-item index="8-3">统计代码</el-menu-item>
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
      console.log(index, indexPath)
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;

  .row-bg {
    height: 100%;
  }
}
</style>
