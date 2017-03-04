<template>
  <div>
      <div v-if="show" class="loading-bar loading-bar--to_right"
            :class="{ 'loading-bar--full': full }"
            :style="styling()">
        <div class="loading-bar-glow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: true,
      full: '',
      width: 0,
      wait: false
    }
  },
  watch: {
    progress(val, old) {
      if (old !== val) {
        this.width = val
        this.$nextTick(() => {
          this.isFull()
        })
      }
    }
  },
  methods: {
    isFull() {
      let isFull = this.width === 100
      if (isFull) {
        this.wait = true
        setTimeout(() => {
          this.full = true
          setTimeout(() => {
            this.show = false
            this.width = 0
            this.wait = false
            this.$nextTick(() => {
              this.full = ''
              this.show = true
            })
          }, 400)
        }, 400)
      }
    },
    styling() {
      if (!this.wait) {
        return { width: `${this.width}%` }
      } else {
        return { width: '100%' }
      }
    }
  }
}
</script>

<style scoped>
  .loading-bar{
    transition: all .4s ease;
    -moz-transition: all .4s ease;
    -webkit-transition: all .4s ease;
    -o-transition: all .4s ease;
    position: fixed;
    top: 0;
    background: #77b6ff;
    height: 2px;
    opacity: 1
  }

  .loading-bar-glow{
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: -2px 0 15px 1px rgba(119,182,255,0.7)
  }

  .loading-bar--to_right{
    left: 0;
    z-index: 1000;
  }

  .loading-bar--to_right .loading-bar-glow{
    right: 0;
    z-index: 1000;
  }

  .loading-bar--full{
    transition: all .3s ease;
    -moz-transition: all .3s ease;
    -webkit-transition: all .3s ease;
    -o-transition: all .3s ease;
    height: 0;
    opacity: 0;
  }
</style>