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
                    <tr v-if="!pages.length">
                        <td colSpan="8" class="center">暂无页面</td>
                    </tr>
                    <tr v-else v-for="page in pages">
                        <td> 
                            <a v-link='{ name: "editPage", params: { id: page._id} }' title={{page.title}}>{{page.title}}</Link>
                            <a v-if="page.status == 3" href={/page/${page.pathname}.html} target="_blank">
                                <span class="glyphicon glyphicon-link" style={{fontSize: 12, marginLeft: 5, color: '#AAA'}}></span>
                            </a>
                        </td>
                        <td>{{ page.status }}</td>
                        <td>{{ page.createdAt }}</td>
                        <td>{{ page.updatedAt }}</td>
                        <td>
                            <a v-link='{ name: "editPage", params: { id: page._id} }'>
                                <button v-if="showEditAndDel" type="button" class="btn btn-primary btn-xs">
                                    <span v-if="showEditAndDel" class="glyphicon glyphicon-edit"></span><span>编辑</span>
                                </button>
                            </a>
                            <span v-if="showEditAndDel"> </span>
                            <button v-if="showEditAndDel" type="button" @click="deletePageByID(page._id)" class="btn btn-danger btn-xs">
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
import store from '../store/index';

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
        pages: [],
    }
  },
  methods: {
    getPage(){
      store.fetchBlogByPage(this, { type: "1" } ).then(result=>{
        this.pages = result;
      })
    },
    deletePageByID(id){
        this.tipInfo = "删除成功";
        this.tipType = 'success'; 
        this.shouldTipShow = true;
        setTimeout(()=>{
            this.shouldTipShow = false;
        }, 2000);
        store.deleteBlogByID(this, id).then(result=>{
            this.pages = this.pages.filter(value=>value._id !== id);
        })
    },
  },
  ready () {
    this.getPage();
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>