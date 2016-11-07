<template>
    <div class="fk-content-wrap">
        <div class="manage-container">
            <div class="fk-search">
                <input type="text" class="fk-search-input" placeholder="请输入关键字" />
                <i class="fk-search-btn icon-search" onClick={this.handleSearch.bind(this)}></i>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>状态</th>
                        <th>创建日期</th>
                        <th>修改日期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colSpan="8" class="center">加载中……</td>
                    </tr>
                    <tr v-if="!posts.length">
                        <td colSpan="8" class="center">暂无文章</td>
                    </tr>
                    <tr v-else v-for="post in posts">
                        <td>
                            <a v-link='{ name: "editPost", params: { id: post._id} }' title={{post.title}}>{{post.title}}</Link>
                            <a v-if="post.status == 3" href={/post/${post.pathname}.html} target="_blank">
                                <span class="glyphicon glyphicon-link" style="fontSize: 12, marginLeft: 5, color: '#AAA'"></span>
                            </a>
                        </td>
                        <td>{{ post.status }}</td>
                        <td>{{ post.createdAt }}</td>
                        <td>{{ post.updatedAt }}</td>
                        <td>
                            <a v-link='{ name: "editPost", params: { id: post._id} }'>
                                <button v-if="showEditAndDel" type="button" class="btn btn-primary btn-xs">
                                    <span v-if="showEditAndDel" class="glyphicon glyphicon-edit"></span><span>编辑</span>
                                </button>
                            </a>
                            <span v-if="showEditAndDel"> </span>
                            <button v-if="showEditAndDel" type="button" @click="deleteBlogByID(post._id)" class="btn btn-danger btn-xs">
                                <span v-if="showEditAndDel" class="glyphicon glyphicon-trash"></span><span>删除</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="col-xs-12" style="textAlign: 'center'">
                <!--{this.state.total > 1 ? <Pagination
                v-if="total"
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButton={5}
                items={this.state.total}
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
import Api from '../store/api';

export default {

  components: {
    Top,
  },
  props:{
    shouldTipShow: Boolean,
    tipType: String,
    tipInfo: String,
    currentRoute: String,
  },
  data () {
    return {
        showEditAndDel: true,
        posts: [],
    }
  },
  methods: {
    getBlogByPage(){
      Api.fetchBlog({
        type: 0
      }).then(result=>{
        this.posts = result;
      })
    },
    deleteBlogByID(id){
        this.tipInfo = "删除成功";
        this.tipType = 'success'; 
        this.shouldTipShow = true;
        setTimeout(()=>{
            this.shouldTipShow = false;
        }, 2000);
        
        Api.deleteBlogByID(id).then(result=>{
            this.posts = this.posts.filter(value=>value._id !== id);
        });

        Api.fetchPostTagsByID({
            postID: id,
        }).then(tags=>{
            tags.forEach(value=>{
                Api.deleteTagsByPostID(value._id);
            })

        })

        Api.fetchPostCateByID({
            postID: id,
        }).then(tags=>{
            tags.forEach(value=>{
                Api.deleteCateByPostID(value._id)
            })

        })


    },
  },
  ready () {
    this.getBlogByPage();
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>