<template>
  <div id="controlsContainer">
    <button v-if="!isDialogShown" v-on:click="openScanDialog" id="openScanDialog">
      SCAN BADGE
    </button>
    <button v-else v-on:click="openScanDialog" id="openScanDialog">
      X
    </button>
    <dialog v-if="isDialogShown" ref="dialog">
      <div id="dialogContainer">
        <video ref="player" autoplay />
        <div id="captureContainer">
          <button v-if="isCaptureButtonShown" ref="capture" v-on:click="capture" id="capture">Capture</button>
          <button v-else ref="capture" v-on:click="upload" id="capture">Upload</button>
        </div>
        <canvas ref="canvas" v-if="isCanvasShown" />
      </div>
    </dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Controls',
  data: function() {
    return {
      isDialogShown: false,
      isCanvasShown: false,
      isCaptureButtonShown: true,
      dataURLstring: ''
    };
  },
  updated: function() {
    if (this.isDialogShown) {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: { width: 400, height: 400 } })
        .then(stream => {
          this.$refs.player.srcObject = stream;
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    }

    if (this.isCanvasShown) {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      // step 1
      const oc = document.createElement('canvas');
      const octx = oc.getContext('2d');
      oc.width = this.width;
      oc.height = this.height;

      // steo 2: pre-filter image using steps as radius
      const steps = (oc.width / canvas.width) >> 1;
      octx.filter = `blur(${steps}px)`;
      octx.drawImage(this, 0, 0);

      // step 3, draw scaled
      ctx.drawImage(
        oc,
        0,
        0,
        oc.width,
        oc.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      this.dataURLstring = this.$refs.canvas.toDataURL();
      this.$refs.player.style.display = 'none';
      this.$refs.player.srcObject
        .getVideoTracks()
        .forEach(track => track.stop());
    }
  },
  methods: {
    openScanDialog: function() {
      const supported = 'mediaDevices' in navigator;
      if (!supported) {
        alert('No media devices available');
        return;
      }

      this.isDialogShown = !this.isDialogShown;

      if (!this.isDialogShown) {
        this.$refs.player.srcObject
          .getVideoTracks()
          .forEach(track => track.stop());
        this.isCanvasShown = false;
        this.isCaptureButtonShown = true;
      }
    },
    capture: function() {
      this.isCaptureButtonShown = false;
      this.isCanvasShown = true;
    },
    upload: async function() {
      const imageURL = this.dataURLstring;
      const apiResponse = await axios.post('/api/badge/upload', {
        imageb64: imageURL
      });
      const recognizedText = apiResponse.data;
      console.log(recognizedText);
    }
  }
};
</script>

<style lang="sass" scoped>
#controlsContainer
  position: absolute
  width: 100%
  height: 100%

video, canvas
  width: 20rem
  height: 20rem

#openScanDialog
  position: absolute
  top: 0
  right: 0
  margin: 24px
  z-index: 2

#dialogContainer
  position: relative
  display: flex
  > *
    display: flex

#captureContainer
  position: absolute
  left: 50%
  bottom: 15px

#capture
  position: relative
  left: -50%

button
  border-radius: 30px !important
  border-width: 1px
  padding: 11px 23px
  background-color: #f96332
  color: #fff
  cursor: pointer
  font-family: 'Oswald', sans-serif
  letter-spacing: 3px
  outline: 0
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
  position: 
  display: inline-block
  z-index: 2
  width: min-content
  height: min-content
  background-color: transparent
  border: none

</style>
