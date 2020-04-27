<template>
<div class="container">
<div class="box">
  <div class="form-group"> 
    <multiselect v-model="value" placeholder="Select Drone" label="name"  track-by="code" :options="options" :multiple="true"  :custom-label="customLabel" :close-on-select="false"></multiselect>
  </div>
</div>
    <!-- upper row -->
    <div class="row justify-content-center">
        <!-- left col -->
        <div class="col-auto">
<!-- <button onclick="myFunction()" >try me</button>
<p id="demo"></p> -->
        <a id="get-status" v-on:click="map">
            <div class="gifcard">
            <div class="card_image">
                    <img src="https://media.giphy.com/media/3ohhwgrL4KKPIZoTQY/giphy.gif" />
                </div>
                <div class="card_title">
                    <p>Map View</p>
                </div>
            </div>
        </a>
        <!-- end of left -->
        </div>
        <!-- center col -->
        <div class="col-auto">
        <a id="get-status" v-on:click="status">
            <div class="gifcard">
            <div class="card_image">
                    <img src="https://media.giphy.com/media/hv46I8kIAhwlTeiMPj/giphy.gif" />
                </div>
            </div>
        </a>
        <!-- end of center -->
        </div>
        <!-- right col -->
        <div class="col-auto">
            <div class="gifcard">
                <div class="card_image">
                    <!-- <img src="https://i.ibb.co/jWP6hGL/Screenshot-2020-03-27-at-13-17-05.png" class="static"> -->
                    <img src="https://i.pinimg.com/originals/94/70/48/947048a87694397d1e380c24cd6b356b.gif">
                </div>
                <div class="card_title">
                    Live Feed
                </div>
            </div>
        <!-- end of right -->
        </div>
    <!-- END OF UPPER ROW -->
    </div>
    <br>
    <br>
    <br>
       <!-- LOWER row -->
       <div class="row justify-content-center">
        <!-- left col -->
        <div class="col-auto">
          <a v-on:click="heatmap" class="get-status">
            <div class="gifcard">
            <div class="card_image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_1OIXj1RkEkWYFxxvwhizrfLBN7Pgl2pFMQsgvb84NmxkZiIi" />
                </div>
                <div class="card_title">
                    <p class="title-white">Heat-Map View</p>
                </div>
            </div>
            </a>
        <!-- end of left -->
        </div>
        <!-- center col -->
        <div class="col-auto">
          <a id="get-status" v-on:click="mission">
            <div class="gifcard">
                <div class="card_image">
                    <img src="https://cdn.dribbble.com/users/988145/screenshots/3462363/drone-dribbb.gif" />
                </div>
                <div class="card_title">
                    <p>Mission Planning</p>
                </div>
            </div>
          </a>
        <!-- end of center -->
        </div>
        <!-- right col -->
        <div class="col-auto">
                      <a id="map-view" v-on:click="takeover">
            <div class="gifcard">
            <div class="card_image">
                <!-- <img class="static" src="https://i.ibb.co/d6s1Xcr/Screenshot-2020-03-27-at-13-08-38.png" > -->
                <img src="https://media1.giphy.com/media/vfZ7EwPyLnnRm/giphy.gif" />
                </div>
                <div class="card_title">
                    <p>Manual Takeover</p>
                </div>
            </div>
                        </a>
        <!-- end of right -->
        </div>
    <!-- END OF LOWER ROW -->
    </div>
         <vs-popup 
         style="color:rgb(255,255,255)"
      background-color="rgba(255,255,255,.6)"
      :background-color-popup="colorx" title="DENIED!" :active.sync="popupActivo5">
      <p>
          Access Denied!
          <br>
          Higher Privilege Level Required to Perform Action.
      </p>
    </vs-popup>
    <vs-popup 
         style="color:rgb(255,255,255)"
      background-color="rgba(255,255,255,.6)"
      :background-color-popup="colorx" title="SELECT DRONE!" :active.sync="popupActivo4">
      <p>
          No Drone was Selected!
          <br>
          Please Select Drone(s) to Continue.
      </p>
    </vs-popup>
    <vs-popup 
         style="color:rgb(255,255,255)"
      background-color="rgba(255,255,255,.6)"
      :background-color-popup="colorx" title="MULTIPLE DRONES SELECTED!" :active.sync="popupActivo3">
      <p>
          Multiple Drones were Selected!
          <br>
          This Action Requires the Selection of a Single Drone.
          <br>
          Please Select One Drone to Continue.
      </p>
    </vs-popup>
</div>

</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: {
    Multiselect
  },
  props: ['drones', 'role'],
  mounted() {    
    for(var i in this.drones) {
      var drone = {
        name: this.drones[i].airframe,
        code: this.drones[i].id,
        status: this.drones[i].status,
        $isDisabled: false
      }
      if(drone.status == 'offline'){
        drone.$isDisabled = true;
      }
      if(drone.status == 'online'){
          var url = '/status/drones/' + drone.code + '/stopSendingStatus';
          axios.get(url);
          console.log(url);
      }
      this.options.push(drone);
    }
  },
  data () {
    return {
      colorx:"#8B0000",
      popupActivo3:false,
      popupActivo4:false,
      popupActivo5:false,
      value: [],
      options:[],
    }
  },
  methods: {
    stop_status: function(){
            console.log('hi');
      for(var i in this.drones) {
        if(this.drones[i].status == 'online'){
          var url = '/status/drones/' + this.drones[i].code + '/stopSendingStatus';
          axios.get(url);
                console.log(url);
        } 
      }
    },
    customLabel ({ name, code }) {
      return `${name} #${code}`
    },
    status: function(){
      if (this.isAdmin()){
        if (this.value.length != 0){
          var selected = this.value[0].code;
          for(var i in this.value){
            if (this.value.length > 1 && selected != this.value[i].code){
              selected = selected + '&' + this.value[i].code;
            }
          }
            window.location.href = 'status/drones&' + selected;
          }
          else {
            this.popupActivo4=true;
        }
      }
    },
    map: function(){
      if (this.isAdmin()){
        if (this.value.length != 0){
          var selected = this.value[0].code;
          for(var i in this.value){
            if (this.value.length > 1 && selected != this.value[i].code){
            selected = selected + '&' + this.value[i].code;
            }
          }
            window.location.href = 'map/drones&' + selected;
          }
          else {
            this.popupActivo4=true;
        }
      }
    },
    heatmap: function(){
      if (this.isAdmin()){
        if (this.value.length != 0){
          var selected = this.value[0].code;
          for(var i in this.value){
            if (this.value.length > 1 && selected != this.value[i].code){
            selected = selected + '&' + this.value[i].code;
            }
          }
            window.location.href = 'heatmap/drones&' + selected;
          }
          else {
            this.popupActivo4=true;
        }
      }
    },
    mission: function(){
    if (this.isAdmin()){
      if (this.value.length == 1){
      var selected = this.value[0].code;
      for(var i in this.value){
        if (this.value.length > 1 && selected != this.value[i].code){
        selected = selected + '&' + this.value[i].code;
        }
      }
        window.location.href = 'mission/drones&' + selected;
      }
      else if (this.value.length > 1) {
        this.popupActivo3=true;
      }
      else{
        this.popupActivo4=true;
      }
    }
    },
    takeover: function(){
    if (this.isAdmin()){
      if (this.value.length == 1){
      var selected = this.value[0].code;
        window.location.href = 'takeover/' + selected;
      }
      else if (this.value.length > 1) {
        this.popupActivo3=true;
      }
      else{
        this.popupActivo4=true;
      }
    }
    },
    isAdmin: function(){
      if (this.role == ('Admin' || 'Super-Admin')) return true;
      else{
        this.popupActivo5=true
        return false;
      };
    }
  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
