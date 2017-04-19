<template>
  <article class="post">
    <div class="meta">
      <div class="date">{{ article.createdAt }}</div>
    </div>
    <h1 class="title"> <router-link :to="{ name:'post', params:{ pathName: article.pathName } }" >{{ article.title }}</router-link></h1>
    <div class="entry-content">
      <div v-html="filterWebp(article.summary)"/>
      <router-link :to="{ name:'post', params:{ pathName: article.pathName } }" >阅读更多 »</router-link>
    </div>
  </article>
</template>

<script>
export default {
  name: 'blog-summary',
  props: {
    article: {
      type: Object,
      required: true
    },
    supportWebp: Boolean
  },
  serverCacheKey: props => {
    return `${props.article.pathName}::${props.article.updatedAt}::webp::${props.supportWebp}`
  },
  methods: {
    filterWebp(content) {
      if (!this.supportWebp) return content.replace(/\/webp/gm, '')
      return content
    }
  }
}
</script>
