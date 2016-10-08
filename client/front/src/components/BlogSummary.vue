<template>
    <article class="post">
        <div class="meta">
          <div class="date">{{ article.createdAt }}</div>
          <div class="comment"> <a :href="'/post/'+ article.pathName + '.html#comments'">{{ article.commentNum }} comments</a></div>
        </div>
        <h1 class="title"> <router-link :to="{ name:'post', params:{ pathName: article.pathName } }" >{{ article.title }}</router-link></h1>
        <div class="entry-content" v-html="article.summary">
        </div>
      </article>
</template>

<script>
/* eslint-disable */


export default {
  props: {
      article: {
          type: Object,  
          required: true 
      }
  },

  data () {
    return {
      siteName: 'Smallpath的小站',  
      prefix: 'https://smallpath.me',
      logoPath: "https://smallpath.me/static/upload/201605/logo.png",
    }
  }
}
</script>
