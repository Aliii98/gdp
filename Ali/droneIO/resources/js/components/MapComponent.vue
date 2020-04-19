<template>
  <div id="map" ref="map">
    <div v-for="drone in drones">
      <map-marker :lat="drone.location.lat" :lng="drone.location.lng" :droneID="drone.droneID"></map-marker>
    </div>
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
        drones: [],
    }
  },
  mounted: function(){
      this.map = new window.google.maps.Map(this.$refs["map"], {
        center: { lat: 53.809549, lng: -1.554928},
        zoom: 6
      })
      this.$nextTick(function (){
      var drones = this.getSelected();
      console.log(drones);
      for (var i in drones){
        this.processForm(drones[i]);
        this.listen(drones[i]);
      }
    });
    // console.log(this.data.drones)
  },
  methods: {
    getMap(callback){
      let vm = this;
      function checkForMap(){
        if (vm.map) callback(vm.map)
        else setTimeout(checkForMap, 200)
      }
      checkForMap();
    },
    processForm: function(id) {
        var url = '/status/drones/' + id + '/fetchStatusDrone';
        axios.get(url);
        },
    listen: function(id){
        Echo.channel(`drone.${id}`)
                .listen('Status',(event) => {
                    this.drones.push(event)
                    console.log(event);
                });
      },
    getSelected: function(){
        let uri = window.location.href.split('&');
        var drones = [];
          uri.forEach(function(value,index){
            if (index > 0){
              drones.push(uri[index])
            }
        });
        return drones;
      }
  }
}
</script>
