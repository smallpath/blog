<template>
      <div class="fk-content-wrap">
        <top :current-route="currentRoute"></top> 
        <div class="manage-container">
        <div class="fk-search">
            <input
                type="text"
                class="fk-search-input"
                placeholder="请输入关键字"
                value={this.state.keyword}
                onChange={e=> this.setState({keyword: e.target.value})}
                onKeyDown={e=> e.keyCode === 13 && this.handleSearch()}
            />
            <i class="fk-search-btn icon-search" onClick={this.handleSearch.bind(this)}></i>
        </div>
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect.bind(this)}>
            <Tab eventKey={4} title="全　部"></Tab>
            <Tab eventKey={3} title="已发布"></Tab>
            <Tab eventKey={1} title="审核中"></Tab>
            <Tab eventKey={2} title="已拒绝"></Tab>
          </Tabs>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>标题</th>
                <th>作者</th>
                <th>状态</th>
                <th>创建日期</th>
                <th>修改日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading"><td colSpan="8" class="center">加载中……</td></tr>
                <tr v-if="!items.length"><td colSpan="8" class="center">暂无文章</td></tr>
                <tr v-else>
                <td>
                    <Link to={`/post/edit/${item.id}`} title={item.title}>{item.title}</Link>
                    <a v-if="item.status == 3" href={/post/${item.pathname}.html} target="_blank"><span class="glyphicon glyphicon-link" style={{fontSize: 12, marginLeft: 5, color: '#AAA'}}></span></a>
                </td>
                <td>{item.user.display_name || item.user.name}</td>
                <td>{this.renderStatus(item.status)}</td>
                <td>{!item.create_time || item.create_time == '0000-00-00 00:00:00' ? '' : firekylin.formatTime(item.create_time)}</td>
                <td>{firekylin.formatTime(item.update_time)}</td>
                <td>
                    <button
                        v-if="showPassAndDeny"
                        type="button"
                        className="btn btn-success btn-xs"
                        disabled={[0,3].includes(post.status)}
                        onClick={PostAction.pass.bind(PostAction, post.id)}
                    >
                    <span className="glyphicon glyphicon-ok"></span>
                    通过
                    </button>
                    <span v-if="showPassAndDeny"> </span>
                    <button
                        v-if="showPassAndDeny"
                        type="button"
                        className="btn btn-warning btn-xs"
                        disabled={[0,2].includes(post.status)}
                        onClick={PostAction.deny.bind(PostAction, post.id)}
                    >
                    <span v-if="showPassAndDeny" className="glyphicon glyphicon-remove"></span>
                    拒绝
                    </button>
                    <span v-if="showPassAndDeny"> </span>
                    <Link v-if="showEditAndDel" to={`/post/edit/${post.id}`} title={post.title}>
                    <button v-if="showEditAndDel" type="button" className="btn btn-primary btn-xs">
                        <span v-if="showEditAndDel" className="glyphicon glyphicon-edit"></span>
                        编辑
                    </button>
                    </Link>
                    <span v-if="showEditAndDel"> </span>
                    <button
                        v-if="showEditAndDel"
                        type="button"
                        className="btn btn-danger btn-xs"
                        onClick={()=>
                            <!--ModalAction.confirm(
                                '提示',
                                <div className="center">确定删除吗？</div>,
                                PostAction.delete.bind(PostAction, post.id),
                                'modal-sm'
                            )-->
                        }
                    >
                    <span v-if="showEditAndDel" className="glyphicon glyphicon-trash"></span>
                    删除
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