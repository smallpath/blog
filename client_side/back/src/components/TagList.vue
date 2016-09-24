<template>
    <div class="fk-content-wrap">
        <div class="manage-container">
            <div class="fk-search">
                <input type="text" class="fk-search-input" placeholder="请输入关键字" />
                <i class="fk-search-btn icon-search"></i>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>缩略名</th>
                        <th>文章数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colSpan="8" class="center">加载中……</td>
                    </tr>
                    <tr v-if="!tags.length">
                        <td colSpan="8" class="center">暂无文章</td>
                    </tr>
                    <tr v-else v-for="tag in tags">
                        <td>
                            <a v-link='{ name: "editTag", params: { id: tag._id} }' title={{tag.name}}>{{tag.name}}</Link>
                            <a v-if="tag.status == 3" href={/post/${tag.pathname}.html} target="_blank">
                                <span class="glyphicon glyphicon-link" style={{fontSize: 12, marginLeft: 5, color: '#AAA'}}></span>
                            </a>
                        </td>
                        <td>
                            {{tag.pathName}}
                        </td>
                        <td>
                            0
                        </td>
                        <td>
                            <a v-link='{ name: "editTag", params: { id: tag._id} }'>
                                <button v-if="showEditAndDel" type="button" class="btn btn-primary btn-xs">
                                    <span v-if="showEditAndDel" class="glyphicon glyphicon-edit"></span><span>编辑</span>
                                </button>
                            </a>
                            <span v-if="showEditAndDel"> </span>
                            <button v-if="showEditAndDel" type="button" @click="deleteTag(tag._id)" class="btn btn-danger btn-xs">
                                <span v-if="showEditAndDel" class="glyphicon glyphicon-trash"></span><span>删除</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12" style={{textAlign: 'center'}}>
                <!--{this.state.total > 1 ? <Pagination
                v-if="total"
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButton={5}
                tags={this.state.total}
                activePage={this.state.page}
                onSelect={(e, selectEvent) =>
                  this.setState({page: selectEvent.eventKey}, ()=>
                    PostAction.selectList(this.state.page, this.state.key === 4 ? null : this.state.key)
                  )
                }
            />
            : ''}-->
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Top from './Top';
import store from '../store/index';

export default {

  components: {
    Top,
  },
  props:{
    shouldTipShow: Boolean,
    type: String,
    text: String,
    currentRoute: String,
  },
  data () {
    return {
        tags: [],
        showPassAndDeny: true,
        showEditAndDel: true,
    }
  },
  methods: {
    getTag(){
      store.fetchTag(this).then(result=>{
        this.tags = result;
      })
    },
    deleteTag(id){
        store.deleteTag(this, id).then(result=>{
            this.tags = this.tags.filter(value=>value._id !== id);
        })

        store.fetchPostTagsByID(this, {
            tagID: id,
        }).then(tags=>{
            tags.forEach(value=>{
                store.deleteTagsByPostID(this,value._id);
            })

        })

    },
  },
  ready () {
    this.getTag();
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>