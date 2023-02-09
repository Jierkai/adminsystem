<template>
  <!-- 放置一个图标 -->
  <div>
    <svg-icon
      v-if="isFullscreen"
      class="fullscreen"
      icon-class="fullscreen"
      @click="Fullscreen"
    />
    <svg
      v-else
      class="fullscreen"
      icon-class="exit-fullscreen"
      @click="exitFullScreen"
    />
  </div>
</template>

<script>
import screenfull, { isFullscreen } from 'screenfull'

export default {
  name: 'FullScreen',
  computed: {
    isFullscreen() {
      return !isFullscreen
    }
  },
  methods: {
    Fullscreen() {
      if (!screenfull.isEnabled) {
        this.$message.error('浏览器版本低,不可全屏')
        return false
      }
      screenfull.toggle()
    },
    exitFullScreen() {
      screenfull.exit()
    }
  }
}
</script>

<style scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  fill: #fff;
  cursor: pointer;
}
</style>
