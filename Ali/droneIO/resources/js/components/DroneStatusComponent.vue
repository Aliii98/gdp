<template>
<div class="container">
  <h1 class="title has-text-centered">Status</h1>
<!-- <div class="row justify-content-center">
  <div class="col-auto"> -->
    <div v-for="message in messages" v-bind:key="message.droneID" style="width:50%;">
      <vs-card >
        <div slot="header">
          <h3>
            DRONE # {{message.droneID}}
          </h3>
          <div>
            <br>
              Number of Motors : {{ message.numMotors }}
              <br>
              Battery Voltage : {{ message.batteryVolts }}
              <br>
              Location : {{ message.location.lat}}, {{ message.location.lng}}
              <br>
              Mission Started By : {{ message.missionStartedBy }}
              <br>
              Mission Started At : {{ message.missionStartedAt }}
              <br>
          </div>
        </div>
      </vs-card>
    <!-- {{message}} -->
    </div>
  </div>
<!-- </div>
</div> -->
</template>

<script>
import uniq from 'lodash/uniq'
export default {
  data() {
    return {
        messages: [],
    }
  },
  mounted: function(){
    this.$nextTick(function (){
      var drones = this.getSelected();
      // console.log(drones);
      for (var i in drones){
        this.processForm(drones[i]);
        this.listen(drones[i]);
      }
    });
  },
  methods: {
    processForm: function(id) {
        var url = 'drones/' + id + '/fetchStatusDrone';
        // var url = 'drones/' + id + '/startSendingStatus';
        axios.get(url);
        },
    listen: function(id){
        Echo.channel(`drone.${id}`)
                .listen('Status',(event) => {
                    // this.$set(this.messages, 'droneID', event);
                    this.messages.push(event)
                    console.log(event);
                    // console.log(this.messages);
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
  },
}
</script>