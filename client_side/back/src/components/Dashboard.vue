<template>
    <div class="fk-content-wrap">
        <top :current-route="currentRoute"></top> 
        <div class="manage-container">
            <p v-if="needUpdate" class="bg-info" style={{padding: 15, color: '#337ab7'}}>
                Firekylin {{needUpdate}} 已经发布，请立即<a href="http://firekylin.org/release/latest.tar.gz" style={{textDecoration:
                    'underline'}}>下载更新</a>！
            </p>
            <h3 style={{marginBottom: '30px'}}>网站概要</h3>
            <!--<p>目前有 {{count.posts}} 篇文章, 并有 {{count.comments} 条关于你的评论在 {{count.cates}} 个分类中. </p>-->
            <p>点击下面的链接快速开始:</p>
            <div class="">
                <Link to="/post/create">撰写新文章</Link>
                <Link to="/options/general" style={{marginLeft: 20}}>系统设置</Link>
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
                    <h4>关于我们</h4>
                    <ul>
                        <li>
                            <label>项目主页：</label>
                            <a href="http://firekylin.org/" target="_blank">http://firekylin.org/</a>
                        </li>
                        <li>
                            <label>项目源码：</label>
                            <a href="https://github.com/75team/firekylin">https://github.com/75team/firekylin</a>
                        </li>
                        <li>
                            <label>问题反馈：</label>
                            <a href="https://github.com/75team/firekylin/issues">https://github.com/75team/firekylin/issues</a>
                        </li>
                        <li>
                            <label>团队博客：</label>
                            <a href="http://www.75team.com/">http://www.75team.com/</a>
                        </li>
                        <li>
                            <label>开发成员：</label>
                            <a href="https://github.com/welefen">welefen</a>、<a href="https://github.com/lizheming">lizheming</a>、
                            <a
                                href="https://github.com/songguangyu">songguangyu</a>、<a href="https://github.com/showzyl">showzyl</a>
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