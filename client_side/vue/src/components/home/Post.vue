<template>
    <div id='main'>
        <div id="page-post">
            <article class="post detail">
                <div class="meta">
                    <div class="date">{{ article.createdAt }}</div>
                    <div class="comment"> <a href="#comments">{{ article.commentNum }} comments</a></div>
                </div>
                <h1 class="title">{{ article.title }}</h1>

                <div class="entry-content">
                    {{{ article.content }}}
                </div>

                <p>本文链接：<a href="http://smallpath.me/post/react-native-bugfix.html">http://smallpath.me/post/react-native-bugfix.html</a></p>
                <p>-- <acronym title="End of File">EOF</acronym> --</p>
                <div class="post-info">
                    <p> 发表于 <i>2016-09-10 17:03:51</i> ，添加在分类
                    <a href="/cate/Node.js" data-cate="Node.js"> <code class=notebook>Node.js</code></a> 下 ，并被添加「
                    <a href="/tags/Javascript" data-tag="Javascript"> <code class=notebook>Javascript</code></a>
                    <a href="/tags/Node.js" data-tag="Node.js"> <code class=notebook>Node.js</code></a> 」标签 ，最后修改于 <i>2016-09-15 00:33:37</i></p>
                </div>
            </article>
            <nav class=pagination> <a href="/post/react-native-opti.html" class=prev>&laquo; React Native性能优化</a> </nav>
                <!--<div id=comments data-type="disqus"
                    data-thread-key="52822fe6e34f28d1b05b315e0302e4bb" data-url="http://smallpath.me/post/react-native-bugfix.html">
                    <h1 class=title>Comments</h1>
                    <div id=disqus_thread data-url="http://smallpath.me/post/react-native-bugfix.html" data-identifier="52822fe6e34f28d1b05b315e0302e4bb"
                    data-name="smallpath"> 评论加载中... <br> <br> 注：如果长时间无法加载，请针对 disq.us | disquscdn.com | disqus.com 启用代理。 
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../../store/index'

export default {
    data () {
        return {
            article: {} ,
        }
    },
    watch: {

    },
  route: {
    data (obj) {

          let pathName = obj.to.params.pathName;
          store.fetchPostByPathName(this, pathName).then(article=>{this.article= article;window.scrollTo(0, 0)});
        return {
            article: {},
        }

      } 
    },
    methods: {
        getItems () {
            //store.fetchBlogByPage(this,this.page -1 ).then(items=>{this.items=items;window.scrollTo(0, 0)})
        }
    },
    ready () {
        // store.fetchBlogByPage(this,0).then(items=>{this.items=items;window.scrollTo(0, 0)});
        // store.fetchBlogCount(this).then(totalPage=>this.totalPage=totalPage);
    }

}
</script>
