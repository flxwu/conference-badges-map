<template>
  <div id="app">
    <ScanBadge v-if="isBadgeScanShown" v-on:onScanFinish="onScanFinish"/>
    <FilterBadgeData v-else v-bind:textStrings="textArray"/>
    <Map />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import ScanBadge from './components/ScanBadge.vue';
import FilterBadgeData from './components/FilterBadgeData.vue';

export default {
  name: 'app',
  data: function() {
    return {
      textArray: [],
      isBadgeScanShown: true
    };
  },
  components: {
    Map,
    ScanBadge,
    FilterBadgeData
  },
  methods: {
    onFilterCloseFinish: function() {
      this.isBadgeScanShown = true;
    },
    onScanFinish: function(textArray) {
      this.textArray = Array.from(
        new Set(
          textArray
            .sort((t1, t2) => t2.confidence - t1.confidence)
            .map(obj => obj.text)
        )
      );
      this.isBadgeScanShown = false;
    }
  }
};
</script>

<style lang="sass">
body
  margin: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  width: 100vw
  height: 100vh
</style>
