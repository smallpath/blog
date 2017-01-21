<template>
  <article class="post">
    <div class="meta">
      <div class="date">{{ article.createdAt }}</div>
    </div>
    <h1 class="title"> <router-link :to="{ name:'post', params:{ pathName: article.pathName } }" >{{ article.title }}</router-link></h1>
    <div class="entry-content" v-html="article.summary"></div>
  </article>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  serverCacheKey: props => {
    return `${props.article.pathName}::${props.article.updatedAt}`
  }
}
</script>
