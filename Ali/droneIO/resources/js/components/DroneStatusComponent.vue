<template>
  <!-- @submit handles any form of submission. -->
  <!-- .prevent keeps the event from bubbling around and doing anything else. -->
  <div class="hero is-fullheight is-info is-bold">
<div class="hero-body">
<div class="container">

  <h1 class="title has-text-centered">Vue.js Form Processing</h1>
  
  <div class="box">

    <form id="signup-form" @submit.prevent="processForm">
      <div class="field">
        <label class="label">ID</label>
        <input type="text" class="input" name="id" v-model="id">
        </div>
      <div class="field has-text-right">
        <button type="submit" class="button is-danger">Submit</button>
      </div>
    </form>
  </div>
  {{this.messages}}
  {{this.drones}}
  <!-- <button V-on:click="processForm()" >try me</button> -->
    <p class="p-2" v-for="message in messages">
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

    </p>
</div>
</div>
</div>
</template>

<script>
export default {
  
  props: ['drones'],

  data() {
    return {
        id: '',
        messages: {},
    }
  },
  mounted: function(){
    this.$nextTick(function (){
      this.processForm();
      this.listen();
    });
  },

  methods: {
    processForm: function() {
        // console.log({ name: this.name, email: this.email });
        // alert('name=name/' + this.name + '/email/' + this.email);
        var url = 'drones/' + this.drones + '/fetchStatusDrone';
        console.log(url);
        axios.get(url);
        // this.listen();
        },
    listen: function(){
        Echo.channel(`drone.${this.drones}`)
                .listen('Status',(event) => {
                    this.$set(this.messages, 'droneID', event);
                    console.log(event);
                });
        }
  },
  // created(){
  //   this.listen(this.drones);
  //   var url = 'drones/' + this.drones + '/fetchStatusDrone';
  //   axios.get(url);
  // }
}
</script>