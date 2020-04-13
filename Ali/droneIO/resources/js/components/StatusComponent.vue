<template>
  <!-- @submit handles any form of submission. -->
  <!-- .prevent keeps the event from bubbling around and doing anything else. -->
  <div class="hero is-fullheight is-info is-bold">
<div class="hero-body">
<div class="container">

  <h1 class="title has-text-centered">Vue.js Form Processing</h1>
  <div class="box">

    <form id="signup-form" @submit.prevent="processForm('none')">
      <div class="field">
        <label class="label">ID</label>
        <input type="text" class="input" name="id" v-model="id">
        </div>
      <div class="field has-text-right">
      </div>
<br><vs-button v-on:click="processForm('up')" color="dark" type="filled">UP</vs-button>
    <div>                  
    <vs-button v-on:click="processForm('left')" color="dark" type="filled">LEFT</vs-button> <vs-button v-on:click="processForm('right')" color="dark" type="filled">RIGHT</vs-button>
    </div> 
    <vs-button v-on:click="processForm('down')" color="dark" type="filled">DOWN</vs-button>
    </form>
  </div>
  <div class="col-sm-offset-3 col-sm-6">
    </div>
</div>
</div>
</div>
</template>

<script>
export default {
    
  data() {
    return {
        id: '',
        // direction: '',
        messages: {},
    }
  },
  methods: {
    processForm: function(direction) {
        // console.log({ name: this.name, email: this.email });
        // alert('name=name/' + this.name + '/email/' + this.email);
        // var url = `/status/drones/${this.id}/fetchStatusDrone`;
        var url = `/test/${this.id}/${direction}`;
        console.log(url);
        axios.get(url);
        // this.listen();
        },
    // listen: function(){
    //     Echo.channel(`drone.${this.id}`)
    //             .listen('Status',(event) => {
    //                 //this.messages.push(event);
    //                 this.$set(this.messages, 'droneID', event);
    //                 console.log(event);
    //             });
    //     }
  }
}
</script> 