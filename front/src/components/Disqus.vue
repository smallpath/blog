<template>
	<div id="disqus_thread"></div>
</template>

<script>
  export default {
    props: {
      shortname: {
        type: String,
        required: true
      }
    },
    mounted() {
      if (window.DISQUS) {
        this.reset(window.DISQUS)
        return
      }
      this.init()
    },
    methods: {
      reset(dsq) {
        const self = this
        dsq.reset({
          reload: true,
          config: function() {
            this.page.identifier = (self.$route.path || window.location.pathname)
            this.page.url = self.$el.baseURI
          }
        })
      },
      init() {
        const self = this
        window.disqus_config = function() {
          this.page.identifier = (self.$route.path || window.location.pathname)
          this.page.url = self.$el.baseURI
        }
        setTimeout(() => {
          let d = document
          let s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.setAttribute('id', 'embed-disqus')
          s.setAttribute('data-timestamp', +new Date())
          s.src = `//${this.shortname}.disqus.com/embed.js`
          ;(d.head || d.body).appendChild(s)
        }, 0)
      }
    }
  }
</script>