<template>
	<div id="mapContainer" ref="mapContainer"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX;

export default {
  name: 'Map',
  mounted: function() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      // style: 'mapbox://styles/mapbox/light-v9',
      center: [8.6821, 50.1109],
      zoom: 5
    });

    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    this.addMarker(map);
  },
  methods: {
    addMarker: function(map) {
      map.loadImage('https://i.imgur.com/MK4NUzI.png', function(error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
        map.addLayer({
          id: 'markers',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: ['8.6821', '50.1109']
                  }
                }
              ]
            }
          },
          layout: {
            'icon-image': 'custom-marker'
          }
        });
      });
    }
  }
};
</script>

<style lang="sass" scoped>
#mapContainer
  width: 100%
  height: 100%
</style>
