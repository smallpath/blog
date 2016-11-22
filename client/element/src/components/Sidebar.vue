<template>
  <el-row class="sidebar">
    <el-col :span="4" class="full-height">
      <!--<h5>带 icon</h5>-->
        
      <el-menu :router="true" :default-active="fullPath" 
                class="full-height" :unique-opened="true"
                @select="handleSelect">
        <el-menu-item index="/dashboard"><i class="el-icon-menu"></i>概述</el-menu-item>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-document"></i>文章管理</template>
          <el-menu-item index="/post/list">文章列表</el-menu-item>
          <el-menu-item index="/post/create">添加文章</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-document"></i>页面管理</template>
          <el-menu-item-group title="页面管理">
            <el-menu-item index="/page/list">页面列表</el-menu-item>
            <el-menu-item index="/page/create">添加页面</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="前端管理">
            <el-menu-item index="/page/setting">页面设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title"><i class="el-icon-star-on"></i>分类管理</template>
          <el-menu-item index="/cate/list">分类列表</el-menu-item>
          <el-menu-item index="/cate/create">添加分类</el-menu-item>
        </el-submenu>
        
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-star-on"></i>标签管理</template>
          <el-menu-item index="/tag/list">标签列表</el-menu-item>
          <el-menu-item index="/tag/create">添加标签</el-menu-item>
        </el-submenu>
        
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-message"></i>版本管理</template>
          <el-menu-item index="/version/list">版本列表</el-menu-item>
          <el-menu-item index="/version/create">添加版本</el-menu-item>
        </el-submenu>
        
        <el-menu-item index="/user"><i class="el-icon-star-off"></i>用户设置</el-menu-item>
        
        <el-submenu index="8">
          <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
          <el-menu-item index="/option/general">基本设置</el-menu-item>
          <el-menu-item index="/option/comment">评论设置</el-menu-item>
          <el-menu-item index="/option/analytic">统计代码</el-menu-item>
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
      fullPath: ''
    }
  },
  watch: {
    '$route' : function (val) {
      // console.log(val)
    }
  },
  methods: {
    push(name) {
      this.$router.push({ name })
    },
    handleSelect (index, indexPath) {

    }
  },
  beforeMount(){
    this.fullPath = this.$route.path.split('/').slice(0, 3).join('/')  
    this.$store.dispatch('FETCH_OPTIONS').then(() => {
      // if (this.siteInfo['title'] && typeof document !== 'undefined') {
      //   document.title = this.siteInfo['title'].value
      // }
    })
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
