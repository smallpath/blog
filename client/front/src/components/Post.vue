<template>
  <div id='main'>
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">{{ article.createdAt }}</div>
        </div>
        <h1 class="title">{{ article.title }}</h1>

        <div class="entry-content" v-html="article.content"></div>

        <template v-if="shouldShow">
          <p>本文链接：<a :href="siteURL+ '/post/'+ article.pathName">{{siteURL}}/post/{{article.pathName}}</a></p>
          <p>-- <acronym title="End of File">EOF</acronym> --</p>
          <div class="post-info">
            <p> 发表于 <i>{{article.createdAt}}</i> ，
            <template v-if="article.category">
              添加在分类「
              <a :data-cate="article.category">
                  <code class="notebook">{{article.category}}</code>
              </a> 」
            </template>
            <template v-if="article.category">
            下 ，
            </template>
            <template v-if="article.tags && article.tags.length != 0">
              并被添加「
              <router-link v-for="tag in article.tags" 
                  :to="{name:'tagPager', params: { tagName: tag }}" 
                  :data-tag="tag"> 
                  <code class="notebook">{{tag}}</code>
              </router-link> 」标签 ，
            </template>
              最后修改于 <i>{{article.updatedAt}}</i></p>
          </div>
          </template>
      </article>
      <template v-if="shouldShow">
        <nav class=pagination> 
          <router-link v-if="typeof prev.pathName !== 'undefined'" 
            :to="{name:'post', params: {pathName: prev.pathName }}" class="prev">&laquo {{prev.title }}</router-link> 
          <router-link v-if="typeof next.pathName !== 'undefined'" 
            :to="{name:'post', params: {pathName: next.pathName }}" class="next">{{next.title }} &raquo</router-link> 
        </nav>
        <div class="comments" v-if="article.allowComment === true && commentName !== ''">
          <disqus :shortname="commentName" ></disqus>
        </div>
      </template>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  props: ['post', 'prev', 'next', 'siteInfo'],
  serverCacheKey: props => {
    return `${props.post.pathName}::${props.post.updatedAt}`
  },
  computed: {
    shouldShow () {
      return this.post.pathName !== 404
    },
    article () {
      return this.post
    },
    commentType () {
      return this.siteInfo.commentType.value || 'disqus'
    },
    commentName () {
      return this.siteInfo.commentName.value || ''
    },
    siteURL () {
      return this.siteInfo.siteUrl.value || 'localhost'
    }
  },
  watch: {
    '$route': 'resetDisqus'
  },
  methods: {
    reset (dsq) {
      const self = this
      dsq.reset({
        reload: true,
        config: function () {
          this.page.identifier = (self.$route.path || window.location.pathname)
          this.page.url = window.location.href
        }
      })
    },
    resetDisqus (val, oldVal) {
      if (val.name !== 'post') return

      if (window.DISQUS) {
        this.reset(window.DISQUS)
      }
    }
  }
}
</script>
