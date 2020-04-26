<script>
export default {
  props: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    droneID: {type: Number, required: true}
  },
  data() {
    return {
        marker: null,
    }
  },
  mounted: function(){
    var drone = {
      url: 'https://i2.wp.com/fynyty.com/wp-content/uploads/2015/11/drone.png?ssl=1',
      size: new google.maps.Size(75, 75),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(75, 75)
    };
    this.$parent.getMap(map => {
      this.marker = new window.google.maps.Marker({
        position: {lat: this.lat, lng: this.lng},
        map: map,
        icon: drone
      })
    });
    this.listen(this.droneID);
  },
  methods: {
    listen: function(id){
        Echo.channel(`drone.${id}`)
                .listen('Status',(event) => {
                    // this.drones.push(event)
                    // console.log('marker')
                    // console.log(event);
                    var new_marker_position = new google.maps.LatLng(event.location.lat, event.location.lng);
                    this.marker.setPosition(new_marker_position);
                });
      }
  },
  onClickButton (event) {
      this.$emit('clicked', 'someValue');
      console.log('1');
  },
  beforeDestroy(){
    this.marker.setMap(null)
    window.google.maps.event.clearInstanceListeners(this.marker)
  },
  render(){
    return null
  }
}
</script>
