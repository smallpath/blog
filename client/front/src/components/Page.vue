<template>
  <div id='main'>
    <div id="page-post">
      <article class="post detail">
        <div class="meta">
          <div class="date">{{ page.createdAt }}</div>
        </div>
        <h1 class="title">{{ page.title }}</h1>
        <div class="entry-content" v-html="page.content"></div>
      </article>
      <div class="comments" v-if="page.allowComment === true && commentName !== ''">
        <disqus :shortname="commentName" ></disqus>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import mixin from '../mixin/disqus'

export default {
  props: ['page', 'siteInfo'],
  mixins: [mixin],
  serverCacheKey: props => {
    return `${props.page.pathName}::${props.page.updatedAt}`
  },
  computed: {
    commentName () {
      return this.siteInfo.commentName.value || ''
    }
  }
}
</script>
