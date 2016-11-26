<template>
  <div>
    <div v-if="show" class="loading-bar loading-bar--to_right"
          :class="{ 'loading-bar--full': full, 'loading-bar--jump': isJumpToStartPosition }"
          :style="styling()">
      <div class="loading-bar-glow"></div>
    </div>
  <div>
</template>


<script>
export default {
  name: "LoadingBar",
  props: {
    progress: {
      type: Number,
      default: 0
    },
    onProgressDone: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      // To show
      show: true,
      // binding class when it end
      full: '',
      // state to animate the width of loading bar
      width: 0,
      // indicate the loading bar is in 100% ( so, wait it till gone )
      wait: false,
      // jump to 0 to hide
      isJumpToStartPosition: false
    }
  },
  watch:{
    progress(val,old){
      if(old !== val){
        this.width = val
        this.$nextTick(()=>{
          this.isFull()
        })
      }
    }
  },
  methods: {
    // Check whether the proggress is full
    isFull() {
      // Full Indicator
      let isFull = this.width === 100

      // When the progress end or full
      if(isFull){
        // Prevent new progress change
        this.wait = true

        // Start animate it
        setTimeout(() => {

          // animate when element removed
          this.full = true

          setTimeout(() => {
            //remove bar element
            this.show = false
            // New Element is available to create now
            this.isJumpToStartPosition = true

            this.width = 0

            this.wait = false

            this.$nextTick(()=>{
              // Show Bar
              this.isJumpToStartPosition = false
              this.full = ''
              this.show = true

              this.onProgressDone()
            })

          // Duration to Waiting for slick hiding animation
          }, 400);

        // Duration is depend on css animation-duration of loading-bar
        }, 400);
      }
    },

    styling(){
      // When loading bar still in progress
      if(!this.wait){
        return { width: `${this.width}%` };
      // When loading bar end
      }else{
        // Make it stuck at 100 to waiting the animation
        return { width: `100%` };
      }
    }
  },


};
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
    height: 3px;
    opacity: 1
  }

  .loading-bar-glow{
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: -3px 0 15px 1px rgba(119,182,255,0.7)
  }

  .loading-bar--to_right{
    left: 0;
    z-index: 1000;
  }

  .loading-bar--to_right .loading-bar-glow{
    right: 0;
    z-index: 1000;
  }

  .loading-bar--jump {
    transition: all 0 ease;
    -moz-transition: all 0 ease;
    -webkit-transition: all 0 ease;
    -o-transition: all 0 ease;
    height: 3px;
    opacity: 1;
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