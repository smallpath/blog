<template>
    <article class="post">
        <div class="meta">
          <div class="date">{{ article.createdAt }}</div>
          <div class="comment"> <a href="/post/{{ article.pathName }}.html#comments">{{ article.commentNum }} comments</a></div>
        </div>
        <h1 class="title"> <a href="/post/{{ article.pathName }}.html">{{ article.title }}</a></h1>
        <div class="entry-content">
            {{{ article.summary }}}
        </div>
      </article>
</template>

<script>
/* eslint-disable */


export default {
  props: {
      article: {
          type: Object,  // 必須是字符串
          required: true // 必須設定該 prop
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
