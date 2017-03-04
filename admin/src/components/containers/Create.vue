<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item v-for="item in options.items" :label="item.label">
      <el-input v-if="typeof item.description === 'undefined'" :autosize="{ minRows: 2, maxRows: 16}" :type="item.type || 'text'" v-model="form[item.prop]"></el-input>
      <el-popover
        v-if="typeof item.description !== 'undefined'"
        placement="right-start"
        :title="item.label"
        width="50%"
        trigger="hover"
        :content="item.description">
        <el-input slot="reference" :autosize="{ minRows: 2, maxRows: 16}" :type="item.type || 'text'" v-model="form[item.prop]"></el-input>
      </el-popover>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const blackModelArr = ['option', 'user']

export default {
  name: 'list',
  props: ['options'],
  data() {
    let isPost = this.options.name === 'post'
    let isPage = this.options.name === 'page'
    let form = this.options.items.reduce((prev, curr) => {
      prev[curr.prop] = curr.default
      return prev
    }, {})
    return {
      isPost,
      isPage,
      form,
      isLoading: true
    }
  },
  computed: {
    list() {
      return this.$store.state.list
    }
  },
  methods: {
    parseTypeBeforeSubmit() {
      let isOk = true
      this.options.items.forEach(item => {
        try {
          if (item.sourceType === 'Object') {
            this.form[item.prop] = JSON.parse(this.form[item.prop], null, 2)
          }
        } catch (err) {
          isOk = false
        }
      })
      return isOk
    },
    parseTypeAfterFetch() {
      this.options.items.forEach(item => {
        if (item.sourceType === 'Object') {
          this.form[item.prop] = JSON.stringify(this.form[item.prop], null, 2)
        }
      })
    },
    setParams(response) {
      let id = this.$route.params.id
      if (response._id && typeof id === 'undefined') {
        this.$router.replace({ params: { id: response._id } })
        this.form = response
      }
    },
    onSubmit() {
      if (this.parseTypeBeforeSubmit() === false) {
        return this.$message.error('属性验证失败')
      }
      let id = this.$route.params.id
      if (typeof id !== 'undefined') {
        // patch
        return this.$store.dispatch('PATCH', Object.assign({}, {
          id: this.$route.params.id,
          form: this.form
        }, this.options)).then(response => {
          this.parseTypeAfterFetch()
          this.$message({
            message: '已成功提交',
            type: 'success'
          })
          this.setParams(response)
        }).catch(err => console.error(err))
      } else {
        // post
        return this.$store.dispatch('POST', Object.assign({}, {
          form: this.form
        }, this.options)).then(response => {
          this.parseTypeAfterFetch()
          this.$message({
            message: '已成功提交',
            type: 'success'
          })
          let model = this.options.model
          if (blackModelArr.indexOf(model) === -1) {
            this.setParams(response)
          }
        }).catch(err => console.error(err))
      }
    }
  },
  created() {
    // flatten user and options into obj
    if (this.options.isPlain === true) {
      return this.$store.dispatch('FETCH_CREATE', Object.assign({}, {
        id: -1
      }, this.options)).then(() => {
        this.form = Object.assign({}, this.$store.state.curr)
        this.isLoading = false
      }).catch(err => console.error(err))
    }

    // if params has value , fetch from the model
    if (typeof this.$route.params.id !== 'undefined') {
      return this.$store.dispatch('FETCH_CREATE', Object.assign({}, {
        id: this.$route.params.id
      }, this.options)).then(() => {
        this.form = Object.assign({}, this.$store.state.curr)
        this.parseTypeAfterFetch()
        this.isLoading = false
      }).catch(err => console.error(err))
    }
    // else it's a new page, nothing to do
  }
}
</script>

<style lang="scss" scoped>
  .el-form {
    width: 40%;
    margin-top: 20px;

    .el-button {
      width: 100%;
    }
  }
</style>