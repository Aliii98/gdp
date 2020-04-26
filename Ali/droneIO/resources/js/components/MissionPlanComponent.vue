<template>
<div id="main">
      <!-- <button v-on:click="clicked" style="width:100%"> Start Mission</button> -->
        <div id="map" ref="map">
          <!-- <div id="test" v-for="drone in drones">
            <map-marker id="test2" :lat="drone.location.lat" :lng="drone.location.lng" :droneID="drone.droneID" @clicked='drone_click'></map-marker>
          </div> -->
        </div>
        
        <vs-button color="dark" v-on:click="clicked" @click="popupActivo5=true" type="filled" icon="flight_takeoff" style="width:100%">START MISSION</vs-button>
        <vs-button color="red" v-on:click="clearMap" type="filled" icon="cancel" style="width:100%">CLEAR MAP</vs-button>
         <vs-popup
      style="color:rgb(255,255,255)"
      background-color="rgba(255,255,255,.6)"
      :background-color-popup="colorx" title="SUCCESS!" :active.sync="popupActivo5">
      <p>
          Drone En-Route!
          <br>
          Estimated Time to Complete Mission: 05:23:10
      </p>
    </vs-popup>
             <vs-popup
      style="color:rgb(255,255,255)"
      background-color="rgba(255,255,255,.6)"
      :background-color-popup="colorx" title="START PLANNING!" :active.sync="popupActivo4">
      <p>
          To Plan a Mission Click on Drone then Anywhere on the Map to Set Waypoints!          
      </p>
    </vs-popup>
</div>

</template>
  <style scoped>
    #map {
        height: 565px;
      }
  </style>
<script>
export default {
props: ['mission_id'],  
data() {
    return {
      colorx:"#4a5153",
      popupActivo5:false,
      popupActivo4:false,
        map: null,
        poly: null,
        drones: null,
        markers: []
    }
  },
  mounted: function(){
     let vm = this;
        this.map = new window.google.maps.Map(this.$refs["map"], {
        center: { lat: 53.809549, lng: -1.554928},
        zoom: 6
      });

      this.poly = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
      this.poly.setMap(this.map);
        // Add a listener for the click event
        this.map.addListener('click', this.addLatLng);
        this.$nextTick(function (){
          var drones = this.getSelected();
          console.log(drones);
          this.processForm(drones);
          this.listen(drones);
          this.popupActivo4=true;
      });
  },
  created: function(){

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
    clearMap: function(){
      this.poly.setMap(null);
      for (var i in this.markers) this.markers[i].setMap(null);
    },
    processForm: function(id) {
        var url = '/status/drones/' + id + '/fetchStatusDrone';
        axios.get(url);
        },
    listen: function(id){
      let vm = this;
        Echo.channel(`drone.${id}`)
                .listen('Status',(event) => {
                    this.drones = event;
                    console.log(event);
                        var droneICON = {
                          url: 'https://i2.wp.com/fynyty.com/wp-content/uploads/2015/11/drone.png?ssl=1',
                          size: new google.maps.Size(75, 75),
                          origin: new google.maps.Point(0, 0),
                          anchor: new google.maps.Point(17, 34),
                          scaledSize: new google.maps.Size(75, 75)
                        };
                         vm.marker = new window.google.maps.Marker({
                            position: {lat: event.location.lat, lng: event.location.lng},
                            map: vm.map,
                            icon: droneICON
                        });
                        vm.marker.addListener('click', vm.drone_click);
                });
      },
    getSelected: function(){
        let uri = window.location.href.split('&');
        var drone;
        drone = uri[1];
        return drone;
      },
    drone_click: function(event){
      this.addLatLng(event);
    },
    addLatLng(event) {
        var path = this.poly.getPath();
        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        path.push(event.latLng);
        // console.log(event.latLng.lat())
        // console.log(event.latLng.lng())
        // Add a new marker at the new plotted point on the polyline.
        var marker = new google.maps.Marker({
          position: event.latLng,
          title: '#' + path.getLength(),
          map: this.map
        });
        this.markers.push(marker); 
      },
    clicked: function(){
      var my_center = { lat: 53.809549, lng: -1.554928};
      // for (var x in this.poly.getPath().i)
      // console.log(this.poly.getPath().i[x].lat());
      let vm = this;
      var path = this.poly.getPath();
      this.map.setCenter(my_center);
      axios.post(window.location.href + '/storeMission', { //store mission data
        drone_id: vm.getSelected(),
        start_lat: path.i[0].lat(),
        start_lng: path.i[0].lng(),
        end_lat: path.i[path.getLength()-1].lat(),
        end_lng: path.i[path.getLength()-1].lng(),
        completion_time: '11:11:11'
      });
    for (var x in path.i){
        axios.post(window.location.href +'/storeWaypoints', { //store waypoint coordinates
          drone_id: vm.getSelected(),
          mission_id: vm.mission_id,
          lat: path.i[x].lat(),
          lng: path.i[x].lng(),
        });
      }
    },
CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Start Mission';
  controlUI.appendChild(controlText);
var my_center = { lat: 53.809549, lng: -1.554928};
  // Setup the click event listeners: simply set the map to Chicago.
  let vm = this;
  // controlUI.addEventListener('click', function() {
  //   var path = vm.poly.getPath();
  //   map.setCenter(my_center);
  //   axios.post('storeMission', { //store mission data
  //     start_lat: path.i[0].lat(),
  //     start_lng: path.i[0].lng(),
  //     end_lat: path.i[path.getLength()].lat(),
  //     end_lng: path.i[path.getLength()].lng(),
  //     completion_time: '11:11:11'
  //   });
  //   for (var x in path.i){
  //     axios.post('storeWaypoints', { //store waypoint coordinates
  //       mission_id: vm.mission_id,
  //       lat: path.i[x].lat(),
  //       lng: path.i[x].lng(),
  //     });
  //   }
  // });

},
}
}
</script>
