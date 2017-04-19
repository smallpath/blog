<template>
  <div id='main'>
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">{{ post.createdAt }}</div>
        </div>
        <h1 class="title">{{ post.title }}</h1>

        <div class="entry-content" v-html="content"></div>

        <template v-if="shouldShow">
          <p>本文链接：<a :href="siteURL+ '/post/'+ post.pathName">{{siteURL}}/post/{{post.pathName}}</a></p>
          <p>-- <acronym title="End of File">EOF</acronym> --</p>
          <div class="post-info">
            <p> 发表于 <i>{{post.createdAt}}</i> ，
              添加在分类「
              <a :data-cate="post.category">
                  <code class="notebook">{{post.category}}</code>
              </a> 」下 ，并被添加「
              <router-link v-for="tag in post.tags" 
                  :to="{name:'tagPager', params: { tagName: tag }}"
                  :key="tag"
                  :data-tag="tag"> 
                  <code class="notebook">{{tag}}</code>
              </router-link> 」标签 ，最后修改于 <i>{{post.updatedAt}}</i>
            </p>
          </div>
        </template>
      </article>
      <nav v-if="shouldShow" class=pagination> 
        <router-link v-if="typeof prev.pathName !== 'undefined'" 
          :to="{name:'post', params: {pathName: prev.pathName }}" class="prev">&laquo {{prev.title }}</router-link> 
        <router-link v-if="typeof next.pathName !== 'undefined'" 
          :to="{name:'post', params: {pathName: next.pathName }}" class="next">{{next.title }} &raquo</router-link> 
      </nav>
      <div class="comments" v-if="post.allowComment === true && commentName !== ''">
        <disqus :shortname="commentName" ></disqus>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import mixin from '../mixin/disqus'
import Disqus from './Disqus'

export default {
  name: 'post',
  components: {
    Disqus
  },
  props: ['type', 'post', 'prev', 'next', 'siteInfo', 'supportWebp'],
  mixins: [mixin],
  serverCacheKey: props => {
    return `${props.post.pathName}::${props.post.updatedAt}::webp::${props.supportWebp}`
  },
  computed: {
    content() {
      const post = this.post
      const result = post.toc ? `<div id="toc" class="toc">${post.toc}</div>${post.content}` : post.content
      return this.filterWebp(result)
    },
    shouldShow() {
      return this.post.pathName !== 404 && this.type === 'post'
    },
    commentName() {
      return this.siteInfo.commentName.value || ''
    },
    siteURL() {
      return this.siteInfo.siteUrl.value || 'localhost'
    }
  },
  methods: {
    filterWebp(content) {
      if (!this.supportWebp) return content.replace(/\/webp/gm, '')
      return content
    }
  }
}
</script>
