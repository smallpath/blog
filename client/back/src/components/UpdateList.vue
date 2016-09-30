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
                        <th>名称</th>
                        <th>版本</th>
                        <th>地址</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoading">
                        <td colSpan="8" class="center">加载中……</td>
                    </tr>
                    <tr v-if="!items.length">
                        <td colSpan="8" class="center">暂无</td>
                    </tr>
                    <tr v-else v-for="item in items">
                        <td>
                            <a v-link='{ name: "editUpdate", params: { id: item._id} }' title={{item.name}}>{{item.name}}</Link>
                            <a href={/post/${item.pathname}.html} target="_blank">
                                <span class="glyphicon glyphicon-link" style="fontSize: 12, marginLeft: 5, color: '#AAA'"></span>
                            </a>
                        </td>
                        <td>
                            {{item.path}}
                        </td>
                        <td>
                            0
                        </td>
                        <td>
                            <a v-link='{ name: "editUpdate", params: { id: item._id} }'>
                                <button v-if="showEditAndDel" type="button" class="btn btn-primary btn-xs">
                                    <span v-if="showEditAndDel" class="glyphicon glyphicon-edit"></span><span>编辑</span>
                                </button>
                            </a>
                            <span v-if="showEditAndDel"> </span>
                            <button v-if="showEditAndDel" type="button" @click="deleteUpdate(item._id)" class="btn btn-danger btn-xs">
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
        items: [],
        showPassAndDeny: true,
        showEditAndDel: true,
    }
  },
  methods: {
    getUpdates(){
      store.fetchUpdates(this).then(result=>{
        this.items = result.body;
      })
    },
    deleteUpdate(id){
        this.tipInfo = "删除成功";
        this.tipType = 'success'; 
        this.shouldTipShow = true;
        setTimeout(()=>{
            this.shouldTipShow = false;
        }, 2000);
        
        store.deleteUpdate(this, id).then(result=>{
            this.items = this.items.filter(value=>value._id !== id);
        })


    },
  },
  ready () {
    this.getUpdates();
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>