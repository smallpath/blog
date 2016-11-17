<template>
  <el-row class="sidebar">
    <el-col :span="4" class="full-height">
      <!--<h5>带 icon</h5>-->
        
      <el-menu default-active="2" class="full-height" :unique-opened="true"
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
    push(name) {
      this.$router.push({ name })
    },
    handleSelect (index, indexPath) {
      console.log(index, indexPath);
      switch (index) {
        case '1':   this.push('dashboard');  break;
        case '2-1': this.push('postList');   break;
        case '2-2': this.push('postCreate'); break;
        case '3-1': this.push('pageList');   break;
        case '3-2': this.push('pageCreate'); break;
        case '3-3': this.push('pageSetting'); break;
        case '4-1': this.push('cateList'); break;
        case '4-2': this.push('cateCreate'); break;
        case '5-1': this.push('tagList'); break;
        case '5-2': this.push('tagCreate'); break;
        case '6-1': this.push('versionList'); break;
        case '6-2': this.push('versionCreate'); break;
        case '7-1': this.push('userList'); break;
        case '8-1': this.push('optionGeneral'); break;
        case '8-2': this.push('optionComment'); break;
        case '8-3': this.push('optionAnalytic'); break;
        default: this.push('dashboard'); break;
      }
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;

  .row-bg {
    height: 100%;
  }
}

.full-height {
  height: 100%;
}
</style>
