<template>
	<div id='main'>
		<article class="post archive">
			<h1 class=title>{{title}}</h1>
			<div class="entry-content" v-for="(item, key, index) in items">
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
function fetchAchieves (store) {

  return store.dispatch('FETCH_ACHIEVE', {
    conditions: { type: 'post' },
    select: {
      title: 1,
      createdAt: 1,
      pathName: 1
    },
    sort: 1
  })
}

export default {
  data () {
    return {
      title: '归档'
    }
  },
  computed: {
    items () {
      return this.$store.getters.achieves
    }
  },
  preFetch: fetchAchieves,
  beforeMount () {
    if (this.$root._isMounted) {
      fetchAchieves(this.$store)
    }
  }
}
</script>