import { mapGetters } from '../store/vuex'

export default {
  computed: {
    ...mapGetters([
      'option',
      'siteInfo',
      'supportWebp'
    ]),
    logoUrl() {
      return this.getValidImageUrl(this.option ? this.option.logoUrl || '' : '')
    },
    sidebarUrl() {
      return this.getValidImageUrl(this.option ? this.option.sidebarImageUrl || '' : '')
    }
  },
  methods: {
    getValidImageUrl(url) {
      if (!this.supportWebp) return url.replace(/.webp$/, '.png').replace('/webp', '')
      return url
    }
  }
}
