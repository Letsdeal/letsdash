<template>
  <div>
    <video ref="player">
      <source preload autoplay :src="src" :type="type">
    </video>
    <div id="dark-bg"></div>
  </div>
</template>

<script>
  import Card from 'components/card.vue'

  import videojs from 'video.js'
  import 'videojs-contrib-hls'

  export default {
    mounted () {
      this.player = videojs(this.$refs.player)
      this.player.options().autoplay = true
      this.player.play()
    },
    components: {
      Card,
    },
    data: () => {
      return { player: null }
    },
    props: {
      src: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: "application/x-mpegurl"
      }
    }
  }
</script>

<style lang="sass">
  .vjs-controls-disabled
    max-height: 120px
  video
    position: fixed
    top: 0
    left: 0
    z-index: -10
    width: 100%
  #dark-bg
    position: fixed
    top: 0
    left: 0
    z-index: -1
    background: hsla(0, 0%, 0%, 0.7)
    width: 100%
    height: 100%
  .vjs-big-play-button, .vjs-control-bar, .vjs-modal-dialog, .vjs-hidden
    display: none
</style>
