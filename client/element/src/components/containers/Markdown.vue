<template>
  <div class="md-panel">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">加粗</el-menu-item>
      <el-menu-item index="2">斜体</el-menu-item>
      <el-menu-item index="3">链接</el-menu-item>
      <el-menu-item index="4">引用</el-menu-item>
      <el-menu-item index="5">代码段</el-menu-item>
      <el-menu-item index="6">图片</el-menu-item>
      <el-menu-item index="7">有序列表</el-menu-item>
      <el-menu-item index="8">无序列表</el-menu-item>
      <el-menu-item index="9">标题</el-menu-item>
      <el-menu-item index="10">插入标签</el-menu-item>
      <el-submenu index="11">
        <template slot="title">切换模式</template>
        <el-menu-item index="11-1">编辑模式</el-menu-item>
        <el-menu-item index="11-2">分屏模式</el-menu-item>
        <el-menu-item index="11-3">预览模式</el-menu-item>
        <el-menu-item index="11-4">全屏模式</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="md-editor" :class="{ 
        'edit': mode=== 'edit',
        'preview': mode=== 'preview',
        'split': mode=== 'split',
    }">
      <textarea ref="markdown" :value="input" @input="handleInput"></textarea>
      <div class="md-preview markdown" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import marked from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

export default {
  name: 'markdown',
  data () {
    return {
      input: '',
      mode: 'split' // ['edit', 'split', 'shrink']
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.input, { sanitize: true })
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
          case '6': this._insertMore() ; break;
          case '7': this._listOlText() ; break;
          case '8': this._listUlText() ; break;
          case '9': this._headerText() ; break;
          case '10': this._insertMore() ; break;
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
      this.input = value
      this.$emit('input', value)
    }, 300),
    _preInputText(text, preStart, preEnd){
      let textControl = this.$refs.markdown;
      const start = textControl.selectionStart
      const end = textControl.selectionEnd
      const origin = this.input;

      if (start !== end) {
          const exist = origin.slice(start, end)
          text = text.slice(0, preStart) + exist + text.slice(preEnd)
          preEnd = preStart + exist.length
      }
      let input = origin.slice(0, start) + text + origin.slice(end);

      this.input = input;
    },
    _insertMore(){
        this._preInputText("\n<!--more-->", 12, 12);
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
    },
    _listUlText () {
        this._preInputText("- 无序列表项0\n- 无序列表项1", 2, 8)
    },
    _listOlText () {
        this._preInputText("1. 有序列表项0\n2. 有序列表项1", 3, 9)
    },
    _headerText () {
        this._preInputText("## 标题", 3, 5)
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
    overflow: hidden;

    .md-editor {
      width: 100%;
      height: auto;
      transition: width .3s;
      background-color: #fff;
      position: relative;

      textarea {
        display: block;
        border-style: none;
        border-right: 1px solid #ccc;
        resize: none;
        outline: 0;
        height: 100%;
        min-height: 500px;
        width: 100%;
        padding: 15px 15px 0
      }

      .md-preview {
          position: absolute;
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
        left: 49%;
        width: 51%;
      }
    }

    .md-editor.preview {
      textarea {
        display: none;
        width: 0;
      }

      .md-preview {
        left: 0;
        width: 100%;
      }
    }
}

</style>
