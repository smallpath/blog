<template>
    <div class="fk-content-wrap">
        <div class="manage-container">
            <p v-if="needUpdate" class="bg-info" style="padding: 15, color: '#337ab7'">
                Firekylin {{needUpdate}} 已经发布，请立即<a href="http://firekylin.org/release/latest.tar.gz" style="textDecoration:
                    'underline'">下载更新</a>！
            </p>
            <h3 style="marginBottom: '30px'">网站概要</h3>
            <!--<p>目前有 {{count.posts}} 篇文章, 并有 {{count.comments} 条关于你的评论在 {{count.cates}} 个分类中. </p>-->
            <p>点击下面的链接快速开始:</p>
            <div class="">
                <a v-link="{ path: '/post/create' }" to="/post/create">撰写新文章</a>
                <a v-link="{ path: '/option/general'}" style="marginLeft: 20">系统设置</a>
            </div>
            <hr />
            <div class="row">
                <div class="col-md-5">
                    <h4>最近发布的文章</h4>
                    <!--<ul>
                        <li v-for="post in posts" key={post.id}>
                            <label>{moment(new Date(post.create_time)).format('MM.DD')}：</label>
                            <a href={`/post/${post.pathname}`} target="_blank">{post.title}</a>
                        </li>
                    </ul>-->
                </div>
                <div class="col-md-3">
                    <!--<h4>系统概况</h4>
                    <ul>
                        <li><label>服务器系统：</label>{platform}</li>
                        <li><label>Node.js版本：</label>{nodeVersion}</li>
                        <li><label>V8引擎版本：</label>{v8Version}</li>
                        <li><label>MySQL版本：</label>{mysqlVersion}</li>
                        <li><label>ThinkJS版本：</label>{thinkjsVersion}</li>
                        <li><label>FireKylin版本：</label>{firekylinVersion}</li>
                    </ul>-->
                </div>
                <div class="col-md-4">
                    <h4>关于博客</h4>
                    <ul>
                        <li>
                            <label>项目源码：</label>
                            <a href="https://github.com/Smallpath/Blog">https://github.com/Smallpath/Blog</a>
                        </li>
                        <li>
                            <label>问题反馈：</label>
                            <a href="https://github.com/Smallpath/Blog/issues">https://github.com/Smallpath/Blog/issues</a>
                        </li>
                    </ul>
                </div>
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

    }
  },
  ready(){
      Api.fetchUser().then(result=>{
        if (!Array.isArray(result)){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            this.$router.go({ path:'admin/login' });
        }

      })
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>