<template>
    <div class="fk-content-wrap">
        <div class="manage-container">
            <form onsubmit="return false" class="post-create clearfix">
                <div class="row">
                    <div class="col-xs-9">
                        <div class="form-group"><label class="control-label"><span >撰写文章</span></label>
                            <input name="title" placeholder="标题" label="撰写文章" v-model="post.title" class="form-control" type="text"></div>
                        <div class="pathname">
                            <span>{{ site_url }}{{ isPost? '/post/' : '/page/' }}</span>
                            <div class="form-group">
                                <input :disabled="shouldPathDisabled" name="pathname" v-model="post.pathName" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group">
                            <markdown-editor :content.sync="post.markdownContent"></markdown-editor>
                            <p style="line-height:30px;"><span>文章使用 markdown 格式，格式说明请见</span><a href="https://guides.github.com/features/mastering-markdown/"
                                    target="_blank">这里</a></p>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="button-group"><button type="submit" class="btn btn-default">保存草稿</button>
                            <span> </span><button type="submit" @click="submit" class="btn btn-primary">发布文章</button></div>
                        <div style="margin-bottom:15px;"><label>{{ this.id == ''? '发布日期': '修改日期' }}</label>
                            <div>
                                <div class="rdt">
                                    <datepicker :time.sync="starttime" :option="timeoption"></datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="isPost"><label class="control-label">分类</label>
                            <ul>
                                <li v-for="cate in cates">
                                    <label>
                                        <input name="cate" value="{{cate.name}}" v-model="postCate" type="radio">
                                        <span style="font-weight:normal;">{{cate.name}}</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div class="form-group" v-if="isPost"><label class="control-label">标签</label>
                            <ul>
                                <li v-for="tag in tags">
                                    <label>
                                        <input name="tag" value="{{tag.name}}" v-model="postTags" type="checkbox">
                                        <span style="font-weight:normal;">{{tag.name}}</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div class="form-group" v-if="isPost"><label class="control-label">公开度</label>
                            <div class="col-xs-12 is-public-radiogroup">
                                <div class="">
                                    <div class="radio"><label class=""><input value="1" label="公开" v-model="isPublic" name="is_public" class=""  type="radio"><span >公开</span></label></div>
                                </div>
                                <div class="">
                                    <div class="radio"><label class=""><input value="0" label="不公开" v-model="isPublic"  name="is_public" class=""  type="radio"><span >不公开</span></label></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group"><label class="control-label">权限控制</label>
                            <div><label><input name="allow_comment" v-model="allowComment"  type="checkbox"><span >允许评论</span></label></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Top from './Top';
import MarkdownEditor from './editor/index';
import Datepicker from 'vue-datepicker'
import marked from 'marked'
import moment from 'moment';
import Api from '../store/api';

export default {

  components: {
    Top,
    MarkdownEditor,
    Datepicker,
  },
  props:{
    shouldTipShow: Boolean,
    tipType: String,
    tipInfo: String,
    currentRoute: String,
  },
  data () {
    return {
      starttime: '',
      endtime: '2016-01-19',
      testTime: '',
      multiTime: '',
      timeoption: {
        type: 'min',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '请选择时间',
        buttons: {
            ok: '确认',
            cancel: '取消'
        },
        inputStyle: {
            "display": "block",
            "width": "100%",
            "height": "34px",
            "padding": "6px 12px",
            "font-size": "14px",
            "line-height": "1.42857143",
            "color": "#555",
            "background-color": "#fff",
            "background-image": "none",
            "border": "1px solid #ccc",
            "border-radius": "4px",
            "-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, .075)",
            "box-shadow": "inset 0 1px 1px rgba(0, 0, 0, .075)",
            "-webkit-transition": "border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s",
            "-o-transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
            "transition": "border-color ease-in-out .15s, box-shadow ease-in-out .15s",
        },
      },
      limit: [{
        type: 'weekday',
        available: [1, 2, 3, 4, 5]
      },
      {
        type: 'fromto',
        from: '2016-02-01',
        to: '2016-02-20'
      }],

      id: '',
      isPost: true,
      shouldPathDisabled: false,
      cates: [],
      postCate: [],
      postCateBackup: [],
      tags: [],
      postTags: [],
      postTagsBackup: [],
      allowComment: true,
      isPublic: '1',
      site_url: '',
      post: { 
          updatedAt: '',
          createdAt: '',
          allowComment: 1,
          pathName: '',
          type: '',
          title: '',
          isPublic: '1',
          markdownContent: '',
      },
    }
  },
  route: {
    data({ to }){

      this.isPost = to.path.indexOf('/post/') > -1;

      if (typeof to.params.id == 'undefined'){
        return;
      }

      this.id = to.params.id;
      this.shouldPathDisabled = true;


      let tempResult;

      Api.fetchBlogByID(this.id).then(result=>{
        this.post = result;
        this.starttime = this.post.updatedAt || this.post.createdAt;
        this.timeoption.placeholder = this.starttime;
        this.allowComment = this.post.allowComment == "1" ? true : false;

        if(this.isPost == false)
            return;

        this.postTags = result.tags;
        this.postCate = result.category;

      });

    }

  },
  methods: {
    submit() {
      this.isSubmitting = true;
      let time = moment().format('YYYY-MM-DD HH:mm:ss').toString();
      
      this.tipInfo = "已成功提交";
      this.tipType = 'success'; 
      this.shouldTipShow = true;
      setTimeout(()=>{
          this.shouldTipShow = false;
          this.$router.go({ path: this.isPost ? '/post/list' : '/page/list' });
      }, 2000);


      if (this.id == ''){
        

        let newPost = {
            title: this.post.title,
            type: this.isPost ? '0' : '1',
            updatedAt: time,
            createdAt: time,
            status: 3,
            pathName: this.post.pathName,
            summary: marked(this.post.markdownContent.split('<!--more-->')[0].replace(/<[>]*>/g, '')),
            markdownContent: this.post.markdownContent,
            content: marked(this.post.markdownContent),
            allowComment: this.allowComment == true? '1' : '0',
            isPublic: this.isPublic == '1' ? 1: 0,
            commentNum: 0,
            options: {},
            category: this.postCate,
            tags: this.postTags
        }

        Api.newBlog(newPost).then(body=>{
          this.isSubmitting = false;
        });



      }else{

        this.post = Object.assign({}, this.post, {
            updatedAt: time,
            summary: marked(this.post.markdownContent.split('<!--more-->')[0].replace(/<[>]*>/g, '')),
            markdownContent: this.post.markdownContent,
            content: marked(this.post.markdownContent),
            allowComment: this.allowComment == true? '1' : '0',
            isPublic: this.isPublic == '1' ? 1: 0,
            category: this.postCate,
            tags: this.postTags
        });

        Api.patchBlog(this.id ,this.post).then(body=>{
          this.isSubmitting = false;
        })


      }


    }
    
  },
  ready(){

      Api.fetchOption({ key: 'site_url' }).then(result=>{
          if(Array.isArray(result) && result[0])
            this.site_url = result[0].value;
      })

    if(this.isPost == false)
        return;
    
      Api.fetchCate().then(result=>{
        this.cates = result;
      })
      Api.fetchTag().then(result=>{
        this.tags = result;
      })
  }
}
</script>


<style scoped>
    .pathname {
        overflow: hidden;
        margin-bottom: 15px;
    }
    
    .pathname > span {
        float: left;
        line-height: 39px;
    }
    
    .pathname > .form-group {
        float: left;
        min-width: 320px;
        margin: 0 5px;
        display: inline-block;
    }
    
    .md-panel {
        height: 550px;
    }
    
    .md-panel.fullscreen {
        height: auto;
    }
    
    .rc-select-dropdown-menu {
        max-height: 200px;
        overflow: hidden;
    }
    
    .is-public-radiogroup {
        padding: 0 1px;
    }
    /** 文章编辑右侧 **/
    
    .post-create .col-xs-3 > div.button-group {
        margin-top: 25px;
        margin-bottom: 15px;
    }
    
    .post-create .col-xs-3 > div.button-group > button {
        width: 45%;
    }
    
    .post-create .col-xs-3 > div.button-group > button:last-child {
        float: right;
    }
</style>