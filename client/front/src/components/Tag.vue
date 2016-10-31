<template>
    <div id='main'>
        <article class="post tags">
            <h1 class=title>{{title}}</h1>
            <div class="entry-content">
                <section> 
                    <router-link v-for="item in items" 
                        :to="{ name: 'tagPager', params:{ tagName: item.name } }" :data-tag="item.name">{{item.name}}({{item.count}})</router-link> 
                </section>
            </div>
        </article>
        <my-footer></my-footer>
    </div>
</template>

<script>
import store from '../store/api'

export default {
  data () {
    return {
      title: '标签',
      items: {}
    }
  },
  mounted () {
    store.fetchTags().then(items => {
      store.fetchPostTags().then(postTags => {
        postTags.forEach(value => {
          let tagID = value.tagID
          let targetIndex = 0
          items.forEach((value, index) => {
            if (value._id === tagID) {
              targetIndex = index
            }
          })

          if (typeof items[targetIndex].count === 'undefined') {
            items[targetIndex].count = 1
          } else {
            items[targetIndex].count ++
          }
        })
        items.sort((a, b) => b.count - a.count)
        this.items = items
      })
    })
  }

}
</script>