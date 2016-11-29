<template>
  <el-form ref="form" v-loading.body="isLoading" :model="form" label-width="80px">
    <el-row :gutter="0">
      <el-col :span="18">
        <el-form-item v-for="(item, index) in prevItems" :label="item.label">
          <el-input v-if="item.type === 'input'" :placeholder="item.description || ''" v-model="form[item.prop]"></el-input>
          <markdown v-if="item.type === 'markdown'" v-model="form[item.prop]"></markdown>
          <el-radio v-if="item.type === 'radio'" v-model="form[item.prop]" :label="item.label"></el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="20px" style="margin-top:58px">
          <el-button :class="{ 'margin-left': true }" type="info" @click.native="onSave">保存文章</el-button>
          <el-button type="success" @click.native="onSubmit">提交文章</el-button>
        </el-form-item>
        <el-form-item v-for="(item, index) in nextItems" :label="item.label">

          <el-date-picker 
              v-if="item.type === 'date-picker'"
              type="datetime" v-model="form[item.prop]"
              placeholder="选择日期时间">
          </el-date-picker>

          <el-select v-if="item.type === 'select'" v-model="form[item.prop]" multiple>
            <el-option
              v-for="tag in tags"
              :label="tag"
              :value="tag">
            </el-option>            
          </el-select>

          <el-select v-if="item.type === 'radio'" v-model="form[item.prop]">
            <el-option
              v-for="cate in cates"
              :label="cate"
              :value="cate">
            </el-option>            
          </el-select>

          <el-switch v-if="item.type === 'switch'" v-model="form[item.prop]"></el-switch>

        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Markdown from './Markdown'
import marked from '../utils/marked'
import moment from 'moment'

export default {
  name: 'post',
  props: ['options'],
  components: {
    Markdown
  },
  data () {
    let isPost = this.options.name === 'post'
    let isPage = this.options.name === 'page'
    let id = typeof this.$route.params.id === 'undefined' ? -1 : this.$route.params.id
    let form = this.options.items.reduce((prev, curr) => {
      prev[curr.prop] = Array.isArray(curr.default)
                         ? curr.default.map(value => value)
                           : curr.default
      return prev
    }, {})
    form.type = this.options.name
    return {
      isPost,
      isPage,
      cates: [],
      tags: [],
      form,
      id,
      test: '',
      isLoading: id !== -1
    }
  },
  computed: {
    splitIndex () {
      return this.options.items.reduce((prev, curr, index) => {
        if (curr.type === 'split') {
          return index
        }
        return prev
      }, -1)
    },
    prevItems () {
      return this.options.items.slice(0, this.splitIndex)
    },
    nextItems () {
      return this.options.items.slice(this.splitIndex)
    }
  },
  methods: {
    onSave () {

    },
    validate () {
      this.form.summary = marked(this.form.markdownContent.split('<!--more-->')[0])
      this.form.content = marked(this.form.markdownContent.replace(/<!--more-->/g, ''))
      if (this.form.createdAt === '') {
        this.form.createdAt = moment().format('YYYY-MM-DD HH:mm:ss').toString()
      } else {
        this.form.createdAt = moment(this.form.createdAt).format('YYYY-MM-DD HH:mm:ss').toString()
      }

      if (this.form.updatedAt === '') {
        this.form.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss').toString()
      } else {
        this.form.updatedAt = moment(this.form.updatedAt).format('YYYY-MM-DD HH:mm:ss').toString()
      }
    },
    onSubmit () {
      this.validate()
      this.$store.dispatch('POST', {
        model: this.options.model,
        form: this.form
      }).then(response => {
        this.$message({
          message: '文章已成功提交',
          type: 'success'
        })
      }).catch(err => console.error(err))
    },
    handleAddTag (tag) {
      this.form.tags.indexOf(tag) === -1 && this.form.tags.push(tag)
    },
    handleDelete (index) {
      this.form.tags.splice(index, 1)
    }
  },
  created () {
    if (this.id !== -1) {
      // fetch from post model
      this.$store.dispatch('FETCH_BY_ID', Object.assign({}, {
        id: this.id
      }, this.options)).then(post => {
        this.isLoading = false
        post.type = this.options.name
        this.form = post
      })
    }

    if (this.isPage) return

    let fetchCate = this.$store.dispatch('FETCH', {
      model: 'category',
      query: {}
    })

    let fetchTag = this.$store.dispatch('FETCH', {
      model: 'tag',
      query: {}
    })

    Promise.all([fetchCate, fetchTag]).then(([cates, tags]) => {
      this.cates = cates.map(value => value.name)
      this.tags = tags.map(value => value.name)
    }).catch(err => console.error(err))
  }
}
</script>

<style lang="scss" scoped>
  .margin-left {
    margin-left: 10px;
  }

  .el-select {
    margin-right: 5px;
  }

  .el-form {
    margin-top: 20px;
  }
</style>