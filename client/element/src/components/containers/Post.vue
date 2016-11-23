<template>
  <el-form ref="form" v-loading="isLoading" :model="form" label-width="80px">
    <el-row :gutter="0">
      <el-col :span="18">
        <el-form-item v-for="(item, index) in prevItems" :label="item.label">
          <el-input v-if="item.type === 'input'" v-model="form[item.prop]"></el-input>
          <markdown v-if="item.type === 'markdown'" v-model="form[item.prop]"></markdown>
          <el-radio v-if="item.type === 'radio'" v-model="form[item.prop]" :label="item.label"></el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="20px">
          <el-button :class="{ 'margin-left': true }" type="info" @click.native="onSubmit">保存文章</el-button>
          <el-button type="success" @click.native="onSubmit">提交文章</el-button>
        </el-form-item>
        <el-form-item v-for="(item, index) in nextItems" :label="item.label">

          <el-date-picker 
              v-if="item.type === 'date-picker'"
              type="datetime" v-model="form[item.prop]"
              placeholder="选择日期时间">
          </el-date-picker>

          <el-select v-if="item.type === 'select'">
            <el-option
              v-for="tag in tags"
              @click.native="handleAddTag(tag)"
              :label="tag"
              :value="tag">
            </el-option>            
          </el-select>
          <el-tag v-if="item.type === 'select'" v-for="(tag, index) in form.tags" @close="handleDelete(index)" type="primary" :closable="true" :key="tag">{{tag}}</el-tag>

          <el-radio-group v-if="item.type === 'radio'" v-model="form[item.prop]">
            <el-radio v-for="(cate, index) in cates" :class="{ 'margin-left': index === 0 }" :label="cate">{{cate}}</el-radio>
          </el-radio-group>

          <el-switch v-if="item.type === 'switch'" v-model="form[item.prop]"></el-switch>

        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Markdown from './Markdown'

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
    let form = this.options.items.reduce((prev, curr)=>{
      prev[curr.prop] = Array.isArray(curr.default) ? 
                          curr.default.map(value => value) : 
                            curr.default;
      return prev;
    }, {});
    let type = typeof form.type === 'undefined' ? isPost ? "0" : "1" : form.type
    form.type = type;
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
    splitIndex() {
      return this.options.items.reduce((prev, curr, index) => {
        if (curr.type === 'split')
          return index
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
  methods: {
    onSubmit() {
      this.$store.dispatch('POST', {
        model: this.options.model,
        form: this.form,
      }).then(response => {
        this.$message({
          message: '文章已成功提交',
          type: 'success'
        });
      })
    },
    handleAddTag(tag) {
      this.form.tags.indexOf(tag) === -1 && this.form.tags.push(tag)
    },
    handleDelete(index) {
      this.form.tags.splice(index, 1);
    }
  },
  created () {
    if (this.id !== -1) {
      // fetch from post model
      this.$store.dispatch('FETCH_BY_ID', { 
        model: this.options.model,
        id: this.id, 
        query: {}
      }).then(post => {
        this.isLoading = false;
        this.form = post;
      })

    } 


    if (this.isPage) return;

    let fetchCate = this.$store.dispatch('FETCH', { 
      model: 'category', 
      query: {}
    })

    let fetchTag = this.$store.dispatch('FETCH', { 
      model: 'tag', 
      query: {}
    })

    Promise.all([fetchCate, fetchTag]).then(([cates, tags])=>{
      this.cates = cates.map(value => value.name)
      this.tags = tags.map(value => value.name)
    })

  }
}
</script>

<style lang="scss" scoped>
  .margin-left {
    margin-left: 10px;
  }
</style>