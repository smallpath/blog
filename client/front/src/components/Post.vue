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

                <p>本文链接：<a :href="siteURL+ '/post/'+ article.pathName">{{siteURL}}/post/{{article.pathName}}</a></p>
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
                    <template v-if="cates.length && tags.length">
                     下 ，
                    </template>
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
                <div v-if="commentName !== ''" id="comments" :data-type="commentType"
                    :data-thread-key="article.pathName" :data-url="siteURL + '/post/' + article.pathName">
                    <h1 class="title">Comments</h1>
                    <div id="disqus_thread" :data-url="siteURL +'/post/' + article.pathName" :data-identifier="article.pathName"
                    :data-name="commentName"> 评论加载中... <br> <br> 注：如果长时间无法加载，请针对 disq.us | disquscdn.com | disqus.com 启用代理。 
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import api from '../store/api'

function fetchBlog(store, { path:pathName, params, query}){
        pathName = pathName.replace(/^\/post\//g,"");
        return store.dispatch('FETCH_BLOG', { 
            conditions: { pathName },
            select: {
                title: 1,
                createdAt: 1,
                content: 1,
                updatedAt: 1,
                commentNum: 1,
                pathName: 1,
            } 
        });

        /*store.fetchTagsByPostID({ postID: article._id }).then(postTags=>{
            store.fetchTags().then(tags=>{
                let obj = tags.reduce((prev, curr)=>{
                    prev[curr._id] = curr;
                    return prev;
                },{});
                this.tags = [];

                postTags.forEach(value=>{
                    this.tags.push(obj[value.tagID]);
                })
            })

        });
        store.fetchCatesByPostID({ postID: article._id }).then(postCates=>{
            store.fetchCates().then(cates=>{
                let obj = cates.reduce((prev, curr)=>{
                    prev[curr._id] = curr;
                    return prev;
                },{});
                this.cates = [];
                
                postCates.forEach(value=>{
                    this.cates.push(obj[value.categoryID]);
                })

                
            })

        });*/

}

export default {
    data () {
        return {
            cates: [],
            tags: [],
        }
    },
    computed: {
        article() {
            return this.$store.state.blog;
        },
        prev() {
            return this.$store.state.prev;
        },
        next() {
            return this.$store.state.next;
        },
        commentType() {
            return JSON.parse(this.$store.state.siteInfo.comment.value).type || 'disqus';
        },
        commentName() {
            return JSON.parse(this.$store.state.siteInfo.comment.value).name || '';
        },
        siteURL() {
            return this.$store.state.siteInfo.site_url.value || 'localhost';
        }
    },
    preFetch: fetchBlog,
    beforeMount () {
        if (this.$root._isMounted){
            fetchBlog(this.$store, this.$store.state.route)
        }
    },
    watch: {
        '$route': 'getPost'
    },
    methods: {
        getPost (val, oldVal) {
            if (val.name !== 'post')
                return;

            fetchBlog(this.$store, this.$store.state.route)
        }
    },

}
</script>
