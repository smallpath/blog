<template>
    <div id='main'>
        <div id="page-post">
            <article class="post detail">
                <div class="meta">
                    <div class="date">{{ article.createdAt }}</div>
                    <div class="comment"> <a href="#comments">{{ article.commentNum }} comments</a></div>
                </div>
                <h1 class="title">{{ article.title }}</h1>

                <div class="entry-content" v-html="article.content">
                </div>

                <p>本文链接：<a :href="'/post/'+ article.pathName">/post/{{article.pathName}}</a></p>
                <p>-- <acronym title="End of File">EOF</acronym> --</p>
                <div class="post-info">
                    <p> 发表于 <i>{{article.createdAt}}</i> ，
                    <template v-if="cates.length != 0">
                        添加在分类「
                        <a v-for="cate in cates"  
                             :data-cate="cate.name">
                            <code class="notebook">{{cate.name}}</code>
                        </a> 」
                    </template>
                     下 ，
                    <template v-if="tags.length != 0">
                        并被添加「
                        <router-link v-for="tag in tags" 
                            :to="{name:'tagPager', params: { tagName: tag.name }}" 
                            :data-tag="tag.name"> 
                            <code class="notebook">{{tag.name}}</code>
                        </router-link> 」标签 ，
                    </template>
                        最后修改于 <i>{{article.updatedAt}}</i></p>
                </div>
            </article>
            <nav class=pagination> 
                <router-link v-if="typeof prev.pathName !== 'undefined'" 
                    :to="{name:'post', params: {pathName: prev.pathName }}" class="prev">&laquo; {{prev.title }}</router-link> 
                <router-link v-if="typeof next.pathName !== 'undefined'" 
                    :to="{name:'post', params: {pathName: next.pathName }}" class="next">{{next.title }} &raquo;</router-link> 
            </nav>
                <div id="comments" :data-type="commentType"
                    :data-thread-key="article.pathName" :data-url="siteURL + '/post/' + article.pathName">
                    <h1 class="title">Comments</h1>
                    <div id="disqus_thread" :data-url="siteURL +'/post/' + article.pathName" :data-identifier="article.pathName"
                    :data-name="commentName"> 评论加载中... <br> <br> 注：如果长时间无法加载，请针对 disq.us | disquscdn.com | disqus.com 启用代理。 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../store/index'

export default {
    data () {
        return {
            article: {} ,
            cates: [],
            tags: [],
            prev: {},
            next: {},
            commentType: '',
            commentName: '',
            siteURL: '',
        }
    },
    watch: {

    },
  route: {
    data (obj) {
          let pathName = obj.to.params.pathName;
          store.fetchPostByPathName(this, pathName).then(article=>{
                this.article= article;
                store.fetchOption(this).then(result=>{
                    let obj = {};
                    result.forEach(value=>{
                        obj[value.key] = value;
                    });
                    this.siteInfo = obj;

                    if(this.siteInfo['site_url']){
                        this.siteURL = this.siteInfo['site_url'].value;
                    }

                    if(this.siteInfo['comment']){
                        let value = JSON.parse(this.siteInfo['comment'].value);
                        let type = value.type, name = value.name;
                        this.commentType = type;
                        this.commentName = name;
                    }
                })

                store.fetchPrevPostByPathName(this,article._id).then(post=>{
                    if (post.type == '0')
                        this.prev = post;
                });
                store.fetchNextPostByPathName(this,article._id).then(post=>{
                    if (post.type == '0')
                        this.next = post;
                });

                store.fetchTagsByPostID(this,{ postID: article._id }).then(postTags=>{
                    store.fetchTags(this).then(tags=>{
                        let obj = {};
                        tags.forEach(value=>{
                            obj[value._id] = value;
                        });

                        postTags.forEach(value=>{
                            this.tags.push(obj[value.tagID]);
                        })
                    })

                });
                store.fetchCatesByPostID(this,{ postID: article._id }).then(postCates=>{
                    store.fetchCates(this).then(cates=>{
                        
                        let obj = {};
                        cates.forEach(value=>{
                            obj[value._id] = value;
                        });
                        
                        postCates.forEach(value=>{
                            this.cates.push(obj[value.categoryID]);
                        })

                        
                    })

                });

        });

        return {
            article: {} ,
            cates: [],
            tags: [],
            prev: {},
            next: {},
        }

      } 
    },
    methods: {
        getItems () {

        }
    },
    mounted () {

    }

}
</script>
