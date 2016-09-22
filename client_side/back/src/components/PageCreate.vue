<template>
    <div class="fk-content-wrap">
        <div class="manage-container">
            <form onsubmit="return false" class="post-create clearfix">
                <div class="row">
                    <div class="col-xs-9">
                        <div class="form-group"><label class="control-label"><span >撰写文章</span></label>
                            <input name="title" placeholder="标题" label="撰写文章" value="" class="form-control" type="text"></div>
                        <div class="pathname"><span>https://smallpath.me/post/</span>
                            <div class="form-group"><input name="pathname" value="" class="form-control" type="text"></div><span>.html</span></div>
                        <div class="form-group">
                            <markdown-editor></markdown-editor>
                            <p style="line-height:30px;"><span>文章使用 markdown 格式，格式说明请见</span><a href="https://guides.github.com/features/mastering-markdown/"
                                    target="_blank">这里</a></p>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="button-group"><button type="submit" class="btn btn-default">保存草稿</button>
                            <span> </span><button type="submit" @click="submit" class="btn btn-primary">发布文章</button></div>
                        <div style="margin-bottom:15px;"><label>发布日期</label>
                            <div>
                                <div class="rdt "><input class="form-control" value="" type="text">
                                    <datepicker></datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="form-group"><label class="control-label">分类</label>
                            <ul>
                                <li><label><input name="cate" value="1"  type="checkbox"><span style="font-weight:normal;" >前端</span></label></li>
                                <li><label><input name="cate" value="2"  type="checkbox"><span style="font-weight:normal;" >Node.js</span></label></li>
                                <li><label><input name="cate" value="3"  type="checkbox"><span style="font-weight:normal;" >后期</span></label></li>
                                <li><label><input name="cate" value="4"  type="checkbox"><span style="font-weight:normal;" >三维</span></label></li>
                            </ul>
                        </div>
                        <div class="form-group"><label class="control-label">标签</label>
                            <div><span style="width:100%;" class="rc-select rc-select-enabled"><span class="rc-select-selection rc-select-selection--multiple" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" ><ul class="rc-select-selection__rendered" ><li class="rc-select-search rc-select-search--inline" ><span class="rc-select-search__field__wrap" ><input value="" class="rc-select-search__field" role="textbox" ></span></li>
                                </ul>
                                </span>
                                </span>
                            </div>
                        </div>
                        <div class="form-group"><label class="control-label">公开度</label>
                            <div class="col-xs-12 is-public-radiogroup">
                                <div class="">
                                    <div class="radio"><label class=""><input value="1" label="公开" v-model="page.isPublic" name="is_public" class=""  type="radio"><span >公开</span></label></div>
                                </div>
                                <div class="">
                                    <div class="radio"><label class=""><input value="0" label="不公开" name="is_public" class=""  type="radio"><span >不公开</span></label></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group"><label class="control-label">权限控制</label>
                            <div><label><input name="allow_comment" v-model="page.allowComment" type="checkbox"><span >允许评论</span></label></div>
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
import moment from 'moment';
import store from '../store/index';

export default {

  components: {
    Top,
    MarkdownEditor,
    Datepicker,
  },
  props:{
    shouldTipShow: Boolean,
    type: String,
    text: String,
    currentRoute: String,
  },
  data () {
    return {
      starttime: '',
      endtime: '2016-01-19',
      testTime: '',
      multiTime: '',
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'when?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format:"YYYY-MM-DD HH:mm"
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
      page: { 
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
      if (typeof to.params.id == 'undefined'){
        return;
      }

      this.id = to.params.id;

      store.fetchBlogByID(this, this.id).then(result=>{
        this.page = result;
      })
    }

  },
  methods: {
    submit() {
      this.isSubmitting = true;
      if (this.id == '')
        store.newPage(this, this.name).then(body=>{
          console.log('pageCreate',body);
          this.isSubmitting = false;
        })
      else
        store.patchPage(this, this.id ,this.page).then(body=>{
          console.log('pagePatched',body);
          this.isSubmitting = false;
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>