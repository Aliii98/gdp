<template>
<div class="container">
  <h1 class="title has-text-centered">Status</h1>

    <!-- <div class="tests">
      <button v-on:click="singleTest()">SINGLE DRONE TEST </button>
      <button v-on:click="multipleTest()">MULTIPLE DRONES TEST </button>
    </div>
    <button v-on:click="stopStatus()">STOP TEST</button>
    <div v-for="time in responseTimes" style="width:50%;">
      {{time}}
    </div>
    <div v-for="time in responseTimesMultiple" style="width:50%;">
      {{time.end - time.start}}
    </div> -->
    <div v-for="message in messages" style="width:50%;">
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
        responseTimes: [],
        startTime: null,
        endTime: null,
        temp: [{
          id: null,
          start: null,
          end: null,
        }],
        responseTimesMultiple: [],
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
    });
  },
  methods: {
    stopStatus: function(){
      var drones = this.getSelected();
      for(var i in drones){
        var url = '/status/drones/' + drones[i] + '/stopSendingStatus';
        axios.get(url);
      }
    },
    processForm: function(id) {
        var url = 'drones/' + id + '/fetchStatusDrone';
        // var url = 'drones/' + id + '/startSendingStatus';
        axios.get(url);
        },
    singleTest: function(){
      var id = this.getSelected();
      // for (var i in id){
      this.listen_get(id);
      this.listen_status(id);
      this.resTimeTest(id);
      // }

    },
    multipleTest: function(){
        var drones = this.getSelected();
        for (var i in drones){
          this.temp.push({id:drones[i]});
          this.listen_get_multiple(drones[i]);
          this.listen_status_multiple(drones[i]);
          this.resTimeTest_Multiple(drones[i]);
        }
    },
    resTimeTest: function(id) {
        var url = 'drones/' + id + '/fetchStatusDrone';
        axios.get(url);
        setTimeout(this.resTimeTest, 1000, id);
        },
    resTimeTest_Multiple: function(id) {
        var url = 'drones/' + id + '/fetchStatusDrone';
        axios.get(url);
        setTimeout(this.resTimeTest_Multiple, 1000*5, id);
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
      listen_status: function(id){
        Echo.channel(`drone.${id}`)
                .listen('Status',(event) => {
                    // this.$set(this.messages, 'droneID', event);
                    this.endTime = new Date().getTime();
                    this.messages.push(event)
                    this.responseTimes.push(this.endTime - this.startTime);
                    console.log(event);
                    // console.log(this.messages);
                });
        },
    listen_status_multiple: function(id){
    Echo.channel(`drone.${id}`)
            .listen('Status',(event) => {
                this.messages.push(event)
                for (var i in this.temp){
                  if (this.temp[i].id == id){
                    this.temp[i].end = new Date().getTime();
                    // console.log(JSON.stringify(this.temp[i]));
                    var jsonTemp = JSON.stringify(this.temp[i]);
                    this.responseTimesMultiple.push(JSON.parse(jsonTemp));
                    console.log(JSON.stringify(this.responseTimesMultiple));
                    // this.temp[i].start = 0;
                    // this.temp[i].end = 0;
                  }
                }
                // console.log('full')
                // console.log(this.responseTimesMultiple);
            });
    },
    listen_get: function(id){
        Echo.channel(`drone.${id}`)
                .listen('NewDrone',(event) => {
                    this.startTime = new Date().getTime(); //single test
                });
        },
    listen_get_multiple: function(id){
        Echo.channel(`drone.${id}`)
                .listen('NewDrone',(event) => { //multiple test
                for (var i in this.temp){
                  if (this.temp[i].id == id){
                   this.temp[i].start = new Date().getTime();
                  }
                } 
                // console.log('temp');
                // console.log(this.temp);
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