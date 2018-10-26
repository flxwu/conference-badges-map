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
    const map = new H.Map(this.$refs.mapContainer, defaultLayers.normal.map, {
      zoom: 10,
      center: { lat: 52.5, lng: 13.4 }
    });
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    map.setBaseLayer(defaultLayers.satellite.panorama);
    this.addMaker(map);
  },
  methods: {
    addMaker: function(map) {
      let outerElement = document.createElement('div'),
        innerElement = document.createElement('div');

      outerElement.style.userSelect = 'none';
      outerElement.style.webkitUserSelect = 'none';
      outerElement.style.msUserSelect = 'none';
      outerElement.style.mozUserSelect = 'none';
      outerElement.style.cursor = 'default';

      innerElement.style.color = 'red';
      innerElement.style.backgroundColor = 'blue';
      innerElement.style.border = '2px solid black';
      innerElement.style.font = 'normal 12px arial';
      innerElement.style.lineHeight = '12px';

      innerElement.style.paddingTop = '2px';
      innerElement.style.paddingLeft = '4px';
      innerElement.style.width = '20px';
      innerElement.style.height = '20px';

      // add negative margin to inner element
      // to move the anchor to center of the div
      innerElement.style.marginTop = '-10px';
      innerElement.style.marginLeft = '-10px';

      outerElement.appendChild(innerElement);

      // Add text to the DOM element
      innerElement.innerHTML = 'C';

      function changeOpacity(evt) {
        evt.target.style.opacity = 0.6;
      }

      function changeOpacityToOne(evt) {
        evt.target.style.opacity = 1;
      }

      // create dom icon and add/remove opacity listeners
      var domIcon = new H.map.DomIcon(outerElement, {
        // the function is called every time marker enters the viewport
        onAttach: function(clonedElement, domIcon, domMarker) {
          clonedElement.addEventListener('mouseover', changeOpacity);
          clonedElement.addEventListener('mouseout', changeOpacityToOne);
        },
        // the function is called every time marker leaves the viewport
        onDetach: function(clonedElement, domIcon, domMarker) {
          clonedElement.removeEventListener('mouseover', changeOpacity);
          clonedElement.removeEventListener('mouseout', changeOpacityToOne);
        }
      });

      // Marker for Chicago Bears home
      var bearsMarker = new H.map.DomMarker(
        { lat: 41.8625, lng: -87.6166 },
        {
          icon: domIcon
        }
      );
      map.addObject(bearsMarker);
    }
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
