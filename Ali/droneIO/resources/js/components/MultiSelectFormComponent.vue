<template>
<div class="container">
<div class="box">
  <div class="form-group"> 
    <multiselect v-model="value"  placeholder="Select Drone" label="name"  track-by="code" :options="options" :multiple="true"  :custom-label="customLabel" :close-on-select="false"></multiselect>
  </div>
</div>
    <!-- upper row -->
    <div class="row justify-content-center">
        <!-- left col -->
        <div class="col-auto">
<!-- <button onclick="myFunction()" >try me</button>
<p id="demo"></p> -->
        <a id="get-status" v-on:click="map">
            <div class="card">
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
            <div class="card">
            <div class="card_image">
                    <img src="https://media.giphy.com/media/hv46I8kIAhwlTeiMPj/giphy.gif" />
                </div>
            </div>
        </a>
        <!-- end of center -->
        </div>
        <!-- right col -->
        <div class="col-auto">
            <div class="card">
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
            <div class="card">
            <div class="card_image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_1OIXj1RkEkWYFxxvwhizrfLBN7Pgl2pFMQsgvb84NmxkZiIi" />
                </div>
                <div class="card_title">
                    <p class="title-white">Thermal Feed</p>
                </div>
            </div>
        <!-- end of left -->
        </div>
        <!-- center col -->
        <div class="col-auto">
            <div class="card">
                <div class="card_image">
                    <img src="https://11mantras.com/Images/drone-animation-one.gif" />
                </div>
                <div class="card_title">
                    <p>Mission Planning</p>
                </div>
            </div>
        <!-- end of center -->
        </div>
        <!-- right col -->
        <div class="col-auto">
                      <a id="map-view" href="/takeover">
            <div class="card">
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
</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: {
    Multiselect
  },
  props: ['drones'],
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
      this.options.push(drone);
    }
  },
  data () {
    return {
      value: [],
      options:[],
    }
  },
  methods: {
    customLabel ({ name, code }) {
      return `${name} #${code}`
    },
    status: function(){
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
        alert('Please Select Drone First..')
      }
    },
    map: function(){
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
        alert('Please Select Drone First..')
      }
    }
  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
