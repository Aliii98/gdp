<template>
  <div id="map" ref="map">
    <map-marker :lat="-27.344" :lng="133.036"></map-marker>
    <map-marker :lat="-26.344" :lng="132.036"></map-marker>
    <map-marker :lat="-25.344" :lng="131.036"></map-marker>
  </div>
</template>
  <style scoped>
    #map {
        height: 600px;
      }
  </style>
<script>
export default {
  data() {
    return {
        map: null,
    }
  },
  mounted: function(){
      this.map = new window.google.maps.Map(this.$refs["map"], {
        center: { lat: -25.344, lng: 131.036},
        zoom: 4
      })
  },
  methods: {
    getMap(callback){
      let vm = this;
      function checkForMap(){
        if (vm.map) callback(vm.map)
        else setTimeout(checkForMap, 200)
      }
      checkForMap();
    }
  }
}
</script>
<script>

