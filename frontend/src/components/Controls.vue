<template>
  <div id="controlsContainer">
    <button v-on:click="openScanDialog">
      SCAN BADGE
    </button>
    <dialog ref="dialog">
      <video ref="player" autoplay></video>
      <button ref="capture" v-on:click="capture">Capture</button>
      <canvas ref="canvas" width=320 height=240></canvas>
    </dialog>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  methods: {
    openScanDialog: function() {
      const supported = 'mediaDevices' in navigator;
      if (!supported) {
        alert('No media devices available');
        return;
      }
      
      this.$refs.dialog.style.display = 'block'

      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then(stream => {
          this.$refs.player.srcObject = stream;
        })
        .catch(err => console.error(err));
    },
    capture: function() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      context.drawImage(this.$refs.player, 0, 0, canvas.width, canvas.height);
      this.$refs.player.srcObject
        .getVideoTracks()
        .forEach(track => track.stop());
    }
  }
};
</script>

<style lang="sass" scoped>
#controlsContainer
  position: absolute
  top: 0
  right: 0
  z-index: 2
  margin: 20px

button
  border-radius: 30px !important
  border-width: 1px
  padding: 11px 23px
  background-color: #f96332
  color: #fff
  cursor: pointer
  font-family: 'Oswald', sans-serif
  letter-spacing: 3px
  &:after
    content:
    display: block
    background-color: none
    width: 100%
    height: 100%
    position: absolute
    top: 0%
    left: 0%
    border-radius: 3px
    z-index: -1
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.2)
    transition:all 0.3s
  &:hover
    background-color: #ff7549

dialog
  display: none
</style>
