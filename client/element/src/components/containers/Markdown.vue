<template>
  <div class="md-panel">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">加粗</el-menu-item>
      <el-menu-item index="2">斜体</el-menu-item>
      <el-menu-item index="3">链接</el-menu-item>
      <el-menu-item index="4">引用</el-menu-item>
      <el-menu-item index="5">代码段</el-menu-item>
      <el-menu-item index="6">图片</el-menu-item>
      <el-menu-item index="7">插入摘要</el-menu-item>
      <el-submenu index="11">
        <template slot="title">{{labels[mode]}}</template>
        <el-menu-item index="11-1">{{labels['edit']}}</el-menu-item>
        <el-menu-item index="11-2">{{labels['split']}}</el-menu-item>
        <el-menu-item index="11-3">{{labels['preview']}}</el-menu-item>
        <el-menu-item index="11-4">{{labels['full']}}</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-dialog title="图片上传" v-model="isUploadShow">
      <el-upload
        action="https://up.qbox.me/"
        type="drag"
        :thumbnail-mode="true"
        :data="form"
        :before-upload="beforeUpload"
        >
        <i class="el-icon-upload"></i>
        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>

    <div class="md-editor" :class="{ 
        'edit': mode=== 'edit',
        'preview': mode=== 'preview',
        'split': mode=== 'split',
    }">
      <textarea ref="markdown" :value="value" @input="handleInput"></textarea>
      <div class="md-preview markdown" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import marked from '../utils/marked'
import moment from 'moment'

export default {
  name: 'markdown',
  props: ['value'],
  data () {
    return {
      labels: {
        'edit': '编辑模式',
        'split': '分屏模式',
        'preview': '预览模式',
        'full': '全屏模式'
      },
      mode: 'split', // ['edit', 'split', 'preview']
      isUploadShow: false,
      upToken: '',
      filePath: '',
      form: {}
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.value.replace(/<!--more-->/g, ''), { sanitize: true })
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (keyPath.length === 1) {
        switch (key) {
          case '1': this._boldText() ; break;
          case '2': this._italicText() ; break;
          case '3': this._linkText() ; break;
          case '4': this._blockquoteText() ; break;
          case '5': this._codeText() ; break;
          case '6': this._uploadImage() ; break;
          case '7': this._insertMore() ; break;
        }
      } else if (keyPath.length === 2) {
        switch (key) {
          case '11-1': this.mode = 'edit';break;
          case '11-2': this.mode = 'split';break;
          case '11-3': this.mode = 'preview';break;
          case '11-4': this.mode = 'edit';break;
        }
      }
    },
    handleInput: _.debounce(function (e) {
      let value = e.target.value
      this.$emit('input', value)
    }, 300),
    _preInputText(text, preStart, preEnd){
      let textControl = this.$refs.markdown;
      const start = textControl.selectionStart
      const end = textControl.selectionEnd
      const origin = this.value;

      if (start !== end) {
          const exist = origin.slice(start, end)
          text = text.slice(0, preStart) + exist + text.slice(preEnd)
          preEnd = preStart + exist.length
      }
      let input = origin.slice(0, start) + text + origin.slice(end);

      this.$emit('input', input)
    },
    _uploadImage() {
      let filePath = '/' + moment().format('YYYYMMDD').toString() + '/' + new Date().getTime();
      this.$store.dispatch('GET_IMAGE_TOKEN', {
        filePath
      }).then(response => {
        this.upToken = response.token;
        this.filePath = filePath;
        this.isUploadShow = true
      })
    },
    beforeUpload(file) {
      this.form = {
        token: this.upToken,
        file: this.filePath,
      }
      return true;
    },
    _insertMore(){
        this._preInputText("<!--more-->", 12, 12);
    },
    _boldText () {
        this._preInputText("**加粗文字**", 2, 6)
    },
    _italicText () {
        this._preInputText("_斜体文字_", 1, 5)
    },
    _linkText (url = 'github.com/smallpath/blog', text = '链接文本') {
        this._preInputText(`[${text}](${url})`, 1, 1+text.length);
    },
    _blockquoteText () {
        this._preInputText("\n> 引用", 3, 5)
    },
    _codeText () {
        this._preInputText("\n```\ncode block\n```", 5, 15)
    }
  }
}
</script>

<style lang="scss" scoped>
.md-editor textarea,
.md-preview {
    line-height: 1.5
}

.md-panel {
    display: block;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    margin-bottom: 58px;
    overflow: hidden;

    .md-editor {
      width: 100%;
      height: auto;
      transition: width .3s;
      background-color: #fff;
      position: relative;

      textarea {
        box-sizing: border-box;
        display: block;
        border-style: none;
        resize: none;
        outline: 0;
        height: 100%;
        min-height: 500px;
        width: 100%;
        padding: 15px 15px 0
      }

      .md-preview {
        box-sizing: border-box;
        position: absolute;
        word-wrap: break-word;
        word-break: normal;
        width: 50%;
        height: 100%;
        left: 100%;
        top: 0;
        background-color: #F9FAFC;
        border-left: 1px solid #ccc;
        overflow: auto;
        transition: left .3s, width .3s;
        padding: 15px 15px 0;
      }
    }  

    .md-editor.edit {
      textarea {
        width: 100%;
      }
    }    
    
    .md-editor.split {
      textarea {
        width: 50%;
      }

      .md-preview {
        left: 50%;
        width: 50%;
      }
    }

    .md-editor.preview {
      textarea {
        width: 50%;
      }

      .md-preview {
        left: 0;
        width: 100%;
        border-left-style: none;
      }
    }
}

</style>
