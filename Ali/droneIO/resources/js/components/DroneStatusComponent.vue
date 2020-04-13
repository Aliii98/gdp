<template>
<div class="container">
  <h1 class="title has-text-centered">Status</h1>
<!-- <div class="row justify-content-center">
  <div class="col-auto"> -->
    <div class="box" v-for="message in messages">
      <br>
    ID : {{ message.droneID }}
    <br>
    Number of Motors : {{ message.numMotors }}
    <br>
    Battery Voltage : {{ message.batteryVolts }}
    <br>
    Location : {{ message.location[0].long}}, {{ message.location[0].lat}}
    <br>
    Mission Started By : {{ message.missionStartedBy }}
    <br>
    Mission Started At : {{ message.missionStartedAt }}
    <br>
    </div>
  </div>
<!-- </div>
</div> -->
</template>

<script>
export default {
  data() {
    return {
        messages: [],
    }
  },
  mounted: function(){
    this.$nextTick(function (){
      var drones = this.getSelected();
      console.log(drones);
      for (var i in drones){
        this.processForm(drones[i]);
        this.listen(drones[i]);
      }
      //   this.processForm(drones.pop());
      //   this.listen(drones.pop());
    });
  },

  methods: {
    processForm: function(id) {
        var url = 'drones/' + id + '/fetchStatusDrone';
        axios.get(url);
        },
    listen: function(id){
        Echo.channel(`drone.${id}`)
                .listen('Status',(event) => {
                    // this.$set(this.messages, 'droneID', event);
                    this.messages.push(event)
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
  },
}
</script>