
<template>
   <div class="row">

       <div class="col-8">
           <div class="card card-default">
               <div class="card-header">Status</div>
               <div class="card-body p-0">
                   <form action="drones/{id}/fetchStatusDrone" method="get" id="getDrone">
                        Enter ID:
                        <input type="text" id="id">
                        <input type="submit" value="Get Status!">
                        <input v-model="id" placeholder="Type Drone ID..">
                   </form>
                       <!-- <p class="p-2" v-for="message in messages">
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

                       </p> -->
               </div>

           </div>
       </div>

   </div>
</template>

<script>
    // var id;
    // export default {
    //     data() {
    //         return {
    //             messages: {},
    //         }
    //     },
    //     created(){
    //         this.fetchStatus();
    //         this.listen();
    //     },
    //     methods: {
    //         fetchStatus()
    //         {
    //             axios.get(`drones/${id}/fetchStatusDrone`);
    //         },
    //         listen()
    //         {
    //             Echo.channel(`drone.${id}`)
    //             .listen('status',(event) => {
    //                 //this.messages.push(event);
    //                 this.$set(this.messages, 'droneID', event);
    //                 console.log(event);
    //             });
    //         }
    //     },
    //     computed: {
    //         uniqMessages () {
    //             return _.uniqBy(this.messages, 'droneID')
    //         }
    //     }
    // }
    // $('#id').change(function () {
    //     console.log('hiiii');
    //     $('#getDrone').attr('action', 'drones/' + $('#id').val() + '/fetchStatusDrone');
    //     id = $('#id').val();
    // });
</script>





<!-- <template> -->
   <!-- <div class="row">

       <div class="col-8">
           <div class="card card-default">
               <div class="card-header">Status</div>
               <div class="card-body p-0"> -->
                       <!-- <p class="p-2" v-for="message in messages">
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

                       </p> -->
               <!-- </div>

           </div>
       </div>

   </div> -->
<!-- // </template>

// <script> -->
    <!-- export default {
        data() {
            return {
                messages: {},
            }
        },
        created(){
            this.fetchStatus();
            this.listen();
        },
        methods: {
            fetchStatus()
            {
                axios.get('fetchStatus');
            },
            listen()
            {
                Echo.channel('home')
                .listen('NewMessage2',(event) => {
                    //this.messages.push(event);
                    this.$set(this.messages, 'droneID', event);
                    console.log(event);
                });
            }
        },
        computed: {
            uniqMessages () {
                return _.uniqBy(this.messages, 'droneID')
            }
        }
    }
</script> -->

