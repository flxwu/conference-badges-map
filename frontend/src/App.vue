<template>
  <div id="app">
    <div id="mapContainer" ref="mapContainer"></div>
  </div>
</template>

<script>
const platform = new H.service.Platform({
  app_id: process.env.VUE_APP_HEREID,
  app_code: process.env.VUE_APP_HERECODE
});

export default {
  name: 'app',
  mounted: function() {
    const defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    const map = new H.Map(
      this.$refs.mapContainer,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 52.5, lng: 13.4 }
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    const ui = H.ui.UI.createDefault(map, defaultLayers);
  }
};
</script>

<style>
body {
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

#mapContainer {
  width: 100%;
  height: 100%;
}

</style>
