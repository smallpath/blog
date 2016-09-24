<template>
    <div class="md-panel">
        <div class="md-menubar">
            <ul class="md-modebar">
                <li class="tb-btn pull-right">
                    <a class="" title="预览模式"><i class="glyphicon glyphicon-eye-open" ></i></a>
                </li><span> </span>
                <li class="tb-btn pull-right">
                    <a class="" title="分屏模式"><i class="glyphicon glyphicon-adjust" ></i></a>
                </li><span> </span>
                <li class="tb-btn pull-right">
                    <a class="active" title="编辑模式"><i class="glyphicon glyphicon-pencil" ></i></a>
                </li><span> </span>
                <li class="tb-btn spliter pull-right"></li>
                <li class="tb-btn pull-right"><a title="全屏模式"><i class="glyphicon glyphicon-fullscreen" ></i></a></li>
                <span> </span>
            </ul>
            <ul class="md-toolbar clearfix">
                <li class="tb-btn">
                    <a title="加粗(Ctrl + B)" @click="_boldText"><i class="glyphicon glyphicon-bold" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="斜体(Ctrl + I)" @click="_italicText"><i class="glyphicon glyphicon-italic" ></i></a>
                </li>
                <li class="tb-btn spliter" @click="_insertMore"></li>
                <li class="tb-btn">
                    <a title="链接(Ctrl + L)" @click="_insertMore"><i class="glyphicon glyphicon-link" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="引用(Ctrl + Q)" @click="_blockquoteText"><i class="glyphicon glyphicon-comment" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="代码段(Ctrl + K)" @click="_codeText"><i class="glyphicon glyphicon-console" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="图片(Ctrl + G)" @click="_insertMore"><i class="glyphicon glyphicon-picture" ></i></a>
                </li>
                <li class="tb-btn spliter"></li>
                <li class="tb-btn">
                    <a title="有序列表(Ctrl + O)" @click="_listOlText"><i class="glyphicon glyphicon-list-alt" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="无序列表(Ctrl + U)" @click="_listUlText"><i class="glyphicon glyphicon-list" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="标题(Ctrl + H)" @click="_headerText"><i class="glyphicon glyphicon-header" ></i></a>
                </li>
                <!--<li class="tb-btn spliter"></li>-->
                <li class="tb-btn">
                    <a title="插入 more 标签(Ctrl + M)" @click="_insertMore"><i class="glyphicon glyphicon-pushpin" ></i></a>
                </li>
            </ul>
        </div>
        <div class="md-editor expand"><textarea name="content" id='myTextArea' v-model="content" @change="getHTMLFromMarkdown"></textarea></div>
        <div class="md-preview markdown shrink"></div>
        <div class="md-spliter"></div>
    </div>
</template>

<script>
/* eslint-disable */
import marked from 'marked'

export default {
  props:{
    shouldTipShow: Boolean,
    tipType: String,
    content: String,
  },
  data () {
    return {
        result: '',
    }
  },
  methods: {
    // _linkModal() {
    //     let _linkText = this._linkText;
    //     ModalAction.confirm(
    //     '插入链接',
    //     <Tabs defaultActiveKey={1}>
    //         <Tab eventKey={1} title="插入外链">
    //         <div style={{margin: '20px 0'}}>
    //             <div className="form-group">
    //             <label className="control-label" style={{display: 'inline-block', lineHeight: '30px'}}>链接地址：</label>
    //             <div style={{display: 'inline-block', width: '80%'}}>
    //                 <input type="text" className="form-control" onChange={e => this.setState({linkUrl: e.target.value})}/>
    //             </div>
    //             </div>
    //             <div className="form-group">
    //             <label className="control-label" style={{display: 'inline-block', lineHeight: '30px'}}>链接文本：</label>
    //             <div style={{display: 'inline-block', width: '80%'}}>
    //                 <input type="text" className="form-control" onChange={e => this.setState({linkText: e.target.value})}/>
    //             </div>
    //             </div>
    //         </div>
    //         </Tab>
    //         <Tab eventKey={2} title="插入内链">
    //         <div style={{margin: '20px 0'}}>
    //             <div className="form-group">
    //             <label className="control-label" style={{display: 'inline-block', lineHeight: '30px'}}>链接地址：</label>
    //             <div style={{display: 'inline-block', width: '80%'}}>
    //                 <Search onSelect={(val, opt) => {
    //                     document.getElementsByClassName('inner-link-text')[0].value = opt.props.children;
    //                     this.setState({linkUrl: `${location.origin}/post/${val}.html`, linkText: opt.props.children})
    //                 }}/>
    //             </div>
    //             </div>
    //             <div className="form-group">
    //             <label className="control-label" style={{display: 'inline-block', lineHeight: '30px'}}>链接文本：</label>
    //             <div style={{display: 'inline-block', width: '80%'}}>
    //                 <input type="text" className="form-control inner-link-text" onChange={e => this.setState({linkText: e.target.value})}/>
    //             </div>
    //             </div>
    //         </div>
    //         </Tab>
    //     </Tabs>,
    //     () => _linkText(this.state.linkUrl, this.state.linkText)
    //     )
    // },

    // _pictureText () {
    //     let preInputText = this._preInputText, that = this;
    //     ModalAction.confirm(
    //     '插入图片',
    //     <Tabs defaultActiveKey={1}>
    //         <Tab eventKey={1} title="本地上传">
    //         <div style={{margin: '20px 0'}}>
    //             <input type="file" name="file" onChange={e=> this.setState({file: e.target.files, fileUrl: null})} />
    //         </div>
    //         </Tab>
    //         <Tab eventKey={2} title="从网络上抓取">
    //         <div style={{margin: '20px 0'}}>
    //             <input type="text" name="url" className="form-control" onChange={e=> this.setState({fileUrl: e.target.value, file: null})} />
    //         </div>
    //         </Tab>
    //     </Tabs>,
    //     ()=> {
    //         if( (this.state.file && this.state.file.length === 0) && !this.state.fileUrl ) {
    //         return false;
    //         }

    //         var data = new FormData;
    //         if( this.state.fileUrl ) {
    //         data.append('fileUrl', this.state.fileUrl);
    //         } else {
    //         data.append('file', this.state.file[0]);
    //         }

    //         return firekylin.upload(data).then(
    //         res => {
    //             res.data = location.origin + res.data;
    //             if( res.data.match(/\.(?:jpg|jpeg|png|bmp|gif|webp|svg|wmf|tiff|ico)$/i) ) {
    //             preInputText(`![alt](${res.data})`, 2, 5);
    //             } else {
    //             let text = that.state.fileUrl ? '链接文本' : that.state.file[0].name;
    //             preInputText(`[${text}](${res.data})`, 1, text.length + 1);
    //             }
    //         }
    //         ).catch((res)=> TipAction.fail(res.errmsg));
    //     }
    //     );
    // },


      getHTMLFromMarkdown(){
          this.result = marked(this.content);
      },
      _preInputText(text, preStart, preEnd){
        let textControl = document.getElementById("myTextArea");
        const start = textControl.selectionStart
        const end = textControl.selectionEnd
        const origin = this.content;

        if (start !== end) {
            const exist = origin.slice(start, end)
            text = text.slice(0, preStart) + exist + text.slice(preEnd)
            preEnd = preStart + exist.length
        }
        let content = origin.slice(0, start) + text + origin.slice(end);

        // pre-select
        this.content = content;
        // setTimeout(()=> textControl.setSelectionRange(start + preStart, start + preEnd), 20);

        this.getHTMLFromMarkdown();
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

        _linkText (url = 'www.yourlink.com', text = '链接文本') {
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
        },

  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    @import './style.css';
</style>