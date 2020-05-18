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
        heatmapData: [],
    }
  },
  mounted: function(){
  var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
      this.map = new window.google.maps.Map(this.$refs["map"], {
        center: new google.maps.LatLng(53.782551, -1.445368),
        zoom: 13,
        mapTypeId: 'satellite'
      });
      // var heatmap = new google.maps.visualization.HeatmapLayer({
      //   data: heatmapData
      // });
      // heatmap.setMap(this.map);
      // this.map = new window.google.maps.Map(this.$refs["map"], {
      //   center: { lat: 53.809549, lng: -1.554928},
      //   zoom: 6
      // })
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
        // var url = '/status/drones/' + id + '/startSendingStatus';
        var url = '/status/drones/' + id + '/fetchStatusDrone';
        axios.get(url);
        var url1 = '/status/drones/' + id + '/sendHeatmapData';
        axios.get(url1);
        // console.log(url);
        },
    listen: function(id){
        Echo.channel(`drone.${id}`)
                .listen('Status',(event) => {
                  console.log(event);
                  if(event.header == 'heatmap'){
                    // this.heatmapData.push(event.data);
                    var google_heatmap_data = [];
                    for (var pt in event.data){
                      google_heatmap_data.push({
                        location: new google.maps.LatLng(event.data[pt].lat, event.data[pt].lng),
                        weight: event.data[pt].weight,
                      }) 
                    }
                    var heatmap = new google.maps.visualization.HeatmapLayer({
                    data: google_heatmap_data
                    });
                    heatmap.setMap(this.map);
                  }else{
                    this.drones.push(event)
                  }
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

