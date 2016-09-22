<template>
    <div class="fk-header clearfix">
        <div class="pull-left">
            <ol class="breadcrumb">
                <template v-for="item in routes">
                    <li class="{{item.url == this.props.location.pathName ? 'active': ''}}">
                        <a v-link="{path:item.children ? item.children[0].url :item.url }" >{{ item == '/dashboard'? "首页": item }}</Link>
                    </li>
                </template>
            </ol>
        </div>
        <ul class="nav navbar-nav navbar-right userinfo">
            <li class={this.getUserClass()}>
            <a onClick={this.toggleUser.bind(this)} class="dropdown-toggle" data-toggle="dropdown">
                {SysConfig.userInfo.name} <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
                <li><Link to="/user/edit_pwd">修改密码</Link></li>
                <li><a href="/admin/user/logout">退出</a></li>
            </ul>
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable */
import classnames from 'classnames';

export default {
  props:{
    shouldTipShow: Boolean,
    type: String,
    text: String,
    currentRoute: String,
  },
  computed: {
      routes () {
          let arr = this.currentRoute.split('/');
          arr = arr.filter(value=>{return value!=''});
          return arr;
      }
  },
  data () {
    return {

    }
  },
  methods: {
    componentDidMount(){
        document.addEventListener('click', this.bindHandleDocumentClick, false);
    },

    componentWillUnmount(){
        document.removeEventListener('click', this.bindHandleDocumentClick, false);
    },

    handleDocumentClick(event){
        if (!ReactDom.findDOMNode(this.refs.userinfo).contains(event.target)) {
            this.setState({
                userOpen: false
            });
        }
    },

    toggleUser(){
        this.setState({
            userOpen: !this.state.userOpen
        })
    },
    getUserClass(){
        return classnames({
            dropdown: true,
            open: this.state.userOpen || true
        })
    },
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
