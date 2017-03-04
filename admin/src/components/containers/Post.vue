<template>
  <el-form ref="form" v-loading.body="isLoading" :model="form" label-width="80px">
    <el-row :gutter="0">
      <el-col :span="18">
        <el-form-item v-for="(item, index) in prevItems" :label="item.label">
          <el-input v-if="item.type === 'input'" :placeholder="item.description || ''" v-model="form[item.prop]"></el-input>
          <markdown v-if="item.type === 'markdown'" v-model="form[item.prop]" :toc="form[item.subProp]" @change="form[item.subProp] = arguments[0]"></markdown>
          <el-radio v-if="item.type === 'radio'" v-model="form[item.prop]" :label="item.label"></el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="20px">
          <el-button :class="{ 'margin-left': true }" type="info" @click.native="jump('prev')"><i class="el-icon-d-arrow-left"></i></el-button>
          <el-button type="info" @click.native="jump('next')"><i class="el-icon-d-arrow-right"></i></el-button>
        </el-form-item>
        <el-form-item label-width="20px">
          <el-button :class="{ 'margin-left': true }" type="info" @click.native="onSaveToc">生成目录 </el-button>
          <el-button type="success" @click.native="onSubmit">提交文章 </el-button>
        </el-form-item>
        <el-form-item v-for="(item, index) in nextItems" :label="item.label">

          <markdown v-if="item.type === 'markdown'" v-model="form[item.prop]"></markdown>

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
import { marked, toc } from '../utils/marked'
import moment from 'moment'

export default {
  name: 'post',
  props: ['options'],
  components: {
    Markdown
  },
  data() {
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
      isLoading: id !== -1,
      markdownChecked: false
    }
  },
  computed: {
    splitIndex() {
      return this.options.items.reduce((prev, curr, index) => {
        if (curr.type === 'split') {
          return index
        }
        return prev
      }, -1)
    },
    prevItems() {
      return this.options.items.slice(0, this.splitIndex)
    },
    nextItems() {
      return this.options.items.slice(this.splitIndex)
    }
  },
  watch: {
    'form.markdownContent': {
      immediate: true,
      handler: function(val, oldVal) {
        if (!val || !this.form.updatedAt) return
        const url = this.$store.state.siteInfo.siteUrl.value
        const path = this.form.pathName
        const key = `${url}|${path}`
        const temp = this.getLS(key) || ''

        const realVal = temp.replace(/\|\d+$/gm, '')
        const matched = temp.match(/\d+$/gm)
        const hitoryTimestamp = parseInt(matched ? matched.slice(-1) : Date.now())
        const currentTimestamp = new Date(this.form.updatedAt).valueOf()
        if (temp !== '' && val !== realVal &&
              this.markdownChecked === false &&
              hitoryTimestamp >= currentTimestamp) {
          this.restore(key, realVal)
        } else if (this.markdownChecked === true) {
          const targetVal = val + `|${Date.now()}`
          this.saveLS(key, targetVal)
        }
        this.markdownChecked = true
      }
    }
  },
  methods: {
    jump(type) {
      if (this.id === -1) return

      let key = type === 'prev' ? '$lt' : '$gt'
      let query = Object.assign({}, this.options.query)
      query.conditions['_id'] = { [key]: this.form._id }
      query.limit = 1
      if (type === 'prev') {
        query.sort = 1
      }
      this.$store.dispatch('FETCH', {
        model: this.options.model,
        query
      }).then(item => {
        if (item.length !== 0) {
          let id = item[0]._id
          this.$router.push({ params: { id } })
          this.id = id
        }
      })
    },
    restore(key, val) {
      this.$confirm('', '发现草稿，是否恢复?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false
      }).then(() => {
        this.form.markdownContent = val
        this.$message({
          type: 'success',
          message: '已恢复草稿'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复，提交文章后将清理草稿'
        })
      })
    },
    saveLS(key, value) {
      window.localStorage.setItem(key, value)
    },
    getLS(key) {
      return window.localStorage.getItem(key)
    },
    onSaveToc() {
      toc.length = 0
      marked(this.form.markdownContent)
      let tocMarkdown = this.tocToTree(toc)
      this.form.markdownToc = '**文章目录**\n' + tocMarkdown
    },
    tocToTree(toc) {
      return toc.map(item => {
        let times = (item.level - 1) * 2
        return `${' '.repeat(times)} - [${item.title}](#${item.slug})`
      }).join('\n')
    },
    validate() {
      this.form.summary = marked(this.form.markdownContent.split('<!--more-->')[0])
      this.form.content = marked(this.form.markdownContent.replace(/<!--more-->/g, ''))
      this.form.markdownToc = this.form.markdownToc || ''
      this.form.toc = marked(this.form.markdownToc)
      if (this.form.createdAt === '') {
        this.form.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
      } else {
        this.form.createdAt = moment(this.form.createdAt).format('YYYY-MM-DD HH:mm:ss')
      }
      this.form.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss')
    },
    onSubmit() {
      this.validate()
      this.$store.dispatch('POST', {
        model: this.options.model,
        form: this.form
      }).then(response => {
        const url = this.$store.state.siteInfo.siteUrl.value
        const path = this.form.pathName
        const timestamp = new Date(this.form.updatedAt).valueOf()
        const key = `${url}|${path}`
        this.saveLS(key, this.form.markdownContent + `|${timestamp}`)
        this.$message({
          message: '文章已成功提交',
          type: 'success'
        })
        if (response._id && this.id === -1) {
          this.$router.replace({ params: { id: response._id } })
          this.form = response
          this.id = response._id
        }
      }).catch(err => console.error(err))
    },
    handleAddTag(tag) {
      this.form.tags.indexOf(tag) === -1 && this.form.tags.push(tag)
    },
    handleDelete(index) {
      this.form.tags.splice(index, 1)
    }
  },
  created() {
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