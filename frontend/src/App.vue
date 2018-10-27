<template>
  <div id="app">
    <Controls />
    <Map />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import Controls from './components/Controls.vue';

export default {
  name: 'app',
  components: {
    Map,
    Controls
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
