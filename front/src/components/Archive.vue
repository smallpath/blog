<template>
	<div id='main'>
		<article class="post archive">
			<h1 class=title>{{title}}</h1>
			<div class="entry-content" v-for="(item, key, index) in achieves">
				<h3>{{ key }} ({{item.length}})</h3>
				<ul>
					<li v-for="subItem in item">
						<router-link :to="{name: 'post', params: { pathName:subItem.pathName  }}" :title="subItem.title">{{subItem.title}}</router-link>&nbsp
						<span class=date>{{ subItem.createdAt.split(' ')[0] }}</span>
					</li>
				</ul>
			</div>
		</article>
		<my-footer></my-footer>
	</div>
</template>

<script>
import { mapGetters } from '../store/vuex'

function fetchAchieves(store, to, callback) {
  return store.dispatch('FETCH_ACHIEVE', {
    model: 'post',
    query: {
      conditions: {
        type: 'post',
        isPublic: true
      },
      select: {
        _id: 0,
        title: 1,
        createdAt: 1,
        pathName: 1
      },
      sort: {
        createdAt: -1
      }
    },
    callback
  })
}

export default {
  metaInfo() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      title: '归档'
    }
  },
  computed: {
    ...mapGetters([
      'achieves',
      'isLoadingAsyncComponent'
    ])
  },
  preFetch: fetchAchieves,
  beforeMount() {
    this.isLoadingAsyncComponent && this.$root._isMounted && fetchAchieves(this.$store, this.$route)
  }
}
</script>