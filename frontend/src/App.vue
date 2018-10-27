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
    let defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    const map = new H.Map(
      this.$refs.mapContainer,
      defaultLayers.satellite.panorama,
      {
        zoom: 10,
        center: { lat: 52.5, lng: 13.4 }
      }
    );
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    let ui = H.ui.UI.createDefault(map, defaultLayers);
    this.geocode(map, 'Essen', 'Germany')
  },
  methods: {
    addMarker: function(map, { lat, lng }) {
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
      let domIcon = new H.map.DomIcon(outerElement, {
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

      // Add Maker
      let conferenceMarker = new H.map.DomMarker(
        { lat, lng },
        {
          icon: domIcon
        }
      );
      map.addObject(conferenceMarker);
    },
    geocode: function(map, city, country) {
      // Create the parameters for the geocoding request:
      const geocodingParams = {
        searchText: `${city}, ${country}`
      };
      const that = this;

      // Define a callback function to process the geocoding response:
      const onResult = function(result) {
        let locations = result.Response.View[0].Result,
          position,
          marker;
        let lat = locations[0].Location.DisplayPosition.Latitude;
        let lng = locations[0].Location.DisplayPosition.Longitude;
        that.addMarker(map, { lat, lng });
      };

      // Get an instance of the geocoding service:
      let geocoder = platform.getGeocodingService();
      geocoder.geocode(geocodingParams, onResult, function(e) {
        alert(e);
      });
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
