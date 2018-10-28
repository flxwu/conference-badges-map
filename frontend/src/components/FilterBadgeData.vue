<template>
  <div id="container">
    <div id="dialog">
      <label>Conference</label>
      <v-select class="select" :options="this.textStrings" :on-change="valueChanged"></v-select>
      <label>Year (optional)</label>
      <v-select class="select" :options="this.textStrings"></v-select>
      <button v-on:click="addBadge" id="addBadge">
        Add Badge
      </button>
    </div>
  </div>
</template>

<script>
import VueSelect from 'vue-select';

export default {
  name: 'FilterBadgeData',
  props: ['textStrings'],
  data: function() {
    return {
      selected: this.textStrings[0]
    }
  },
  methods: {
    valueChanged: function(ev, val) {
      console.log(ev, val);
    }
  }
};
</script>

<style lang="sass" scoped>
#container
  position: absolute
  left: 50%
  bottom: 50%
  z-index: 2

label
  white-space: nowrap

button
  width: min-content
  white-space: nowrap
  margin: auto
  margin-top: 10px

.select
  width: 20rem

#dialog
  position: relative
  left: -50%
  bottom: -50%
  padding: 15px
  border-radius: 10px
  display: flex
  flex-direction: column
  width: min-content
  height: min-content
  background-color: white
</style>

