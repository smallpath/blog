<template>
  <el-table
    :data="list"
    v-loading.body="isLoading"
    border
    style="width: 100%">
    <el-table-column
      v-for="item in options.items"
      :prop="item.prop"
      :label="item.label"
      :width="item.width">
    </el-table-column>
    <el-table-column
      v-if="isPost"
      prop="category"
      label="分类"
      width="120"
      inline-template>
      <el-tag v-if="row.category" :type="'primary'" close-transition>{{row.category}}</el-tag>
    </el-table-column>
    <el-table-column
      v-if="isPost"
      prop="tags"
      label="标签"
      width="180"
      :filters="filters"
      :filter-method="filterTag"
      inline-template>
      <el-tag v-for="tag in row.tags" :type="0 ? 'primary' : 'success'" close-transition>{{tag}}</el-tag>
    </el-table-column>
    <el-table-column
      inline-template
      v-if="!options.isButtonFixed"
      :context="_self"
      label="操作"
      width="150">
      <span>
        <el-button @click="handleClick(row)" type="info" size="small">编辑</el-button>
        <el-button @click="handleDelete(row, $index)" type="danger" size="small">删除</el-button>
      </span>
    </el-table-column>
    <el-table-column
      inline-template
      v-if="options.isButtonFixed"
      fixed="right"
      :context="_self"
      label="操作"
      width="150">
      <span>
        <el-button @click="handleClick(row)" type="info" size="small">编辑</el-button>
        <el-button @click="handleDelete(row, $index)" type="danger" size="small">删除</el-button>
      </span>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'list',
  props: ['options'],
  data() {
    let isPost = this.options.name === 'post'
    let isPage = this.options.name === 'page'
    return {
      isPost,
      isPage,
      isLoading: true
    }
  },
  computed: {
    list() {
      return this.$store.state.list
    },
    filters() {
      if (!this.isPost && !this.isPage) return []

      let obj = this.list.reduce((prev, value) => {
        Array.isArray(value.tags) && value.tags.forEach(tag => {
          prev[tag] = {
            text: tag,
            value: tag
          }
        })
        return prev
      }, {})
      return Object.keys(obj).map(value => {
        return obj[value]
      })
    }
  },
  methods: {
    filterTag(value, row) {
      return row.tags.indexOf(value) !== -1
    },
    handleClick({ _id }) {
      this.$router.push({
        path: `/${this.options.name}/create/${_id}`
      })
    },
    handleDelete({ _id }, index) {
      this.$store.dispatch('DELETE', Object.assign({}, {
        id: _id
      }, this.options)).then(() => {
        this.$store.state.list.splice(index, 1)
      }).catch(err => console.error(err))
    }
  },
  created() {
    this.$store.dispatch('FETCH_LIST', this.options).then(() => {
      this.isLoading = false
    }).catch(err => console.error(err))
  }
}
</script>