<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="24">
        <div class="info">
          <h1>网站概要</h1>
          <div>
            <router-link :to="{ name: 'postCreate' }">
              <el-button type="success">撰写新文章</el-button>
            </router-link>
            <router-link :to="{ name: 'optionGeneral' }">
              <el-button style="margin-left: 10px" type="info">系统设置</el-button>
            </router-link>
          </div>
        </div>
        <el-slider style="margin-top: 20px" v-model="sliderValue"></el-slider>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:20px;">
      <el-col :span="10">
        <div class="recent">
          <el-tree 
              :default-expand-all='true'
              style="border-width: 0px" 
              :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
      <el-col :offset="4" :span="10">
        <div class="blog">
          <el-alert
            title="博客源码:"
            description="https://github.com/smallpath/blog"
            type="success"
            show-icon>
          </el-alert>
          <el-alert
            style="margin-top: 20px;"
            title="问题反馈:"
            description="https://github.com/smallpath/blog/issues"
            type="info"
            show-icon>
          </el-alert>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'info',
  data() {
    return {
      sliderValue: 100,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      list: []
    }
  },
  methods: {
    handleNodeClick(data, node, tree) {
      if (data.title !== '最近发布的文章') {
        this.$router.push({
          name: data.type === 'post' ? 'postCreate' : 'pageCreate',
          params: { id: data._id }
        })
      }
    }
  },
  mounted() {
    this.$store.dispatch('FETCH', {
      model: 'post',
      query: {
        select: {
          title: 1,
          type: 1
        },
        sort: {
          createdAt: -1
        },
        limit: 10
      }
    }).then(list => {
      this.data = [{
        title: '最近发布的文章',
        children: list
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    padding: 20px; 

    .info {
      height: 100px;
    }
  }
</style>