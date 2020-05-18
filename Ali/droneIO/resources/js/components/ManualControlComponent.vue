<template>
<div class="container">
  <div class="top-h">
        
    <vs-card>
      <div slot="header" style="text-align: center;">
        <h1>
          <strong>DRONE #{{d_id}}</strong>
        </h1>
        
      </div>
    </vs-card> 
  </div>
    <div class="box-l">
      <!-- <div class="col-l"> -->
      <vs-card >
        <div slot="header">
          <h3>
            YAW
          </h3>
          <div>{{status.yaw}}</div>
        </div>
      </vs-card>
      <!-- </div> -->
      <!-- <div class="col-l"> -->
      <vs-card>
        <div slot="header">
          <h3>
            ROLL
          </h3>
          <div>{{status.roll}}</div>
        </div>
      </vs-card>
      <!-- </div>
      <div class="col-l"> -->
      <vs-card>
        <div slot="header">
          <h3>
            SPEED
          </h3>
          <div>{{status.speed}}</div>
        </div>
      </vs-card>
      </div>
      <div class="box-l-2">
        <div class="compass">
<div class="compass-inner"><div class="north">N</div><div class="east">E</div><div class="west">W</div><div class="south">S</div><div class="main-arrow"><div class="arrow-up"></div><div class="arrow-down"></div></div></div>
</div>
      </div>
    <div class="box-r-2" style="height:auto;">
      <vs-card style="height:150px; width:auto;">
        <div slot="header" style="height:auto;">
          <h3>
            BATTERY
          </h3>
          <!-- <div>{{alt}}</div> -->
          <div class="battery-icon"></div>
        </div>
      </vs-card>
    </div>
    <div class="box-r">
       <!-- <div class="col-r"> -->
      <vs-card>
        <div slot="header">
          <h3>
            ALT
          </h3>
          <div>{{status.location.alt}}</div>
        </div>
      </vs-card>
      <!-- </div> -->
      <!-- <div class="col-r">  -->
      <vs-card >
        <div slot="header">
          <h3>
            LAT
          </h3>
          <div>{{status.location.lat}}</div>
        </div>
      </vs-card>
      <!-- </div> -->
      <!-- <div class="col-r"> -->
      <vs-card>
        <div slot="header">
          <h3>
            LNG
          </h3>
          <div>{{status.location.lng}}</div>
        </div>
      </vs-card>
      </div>
    <div id="box-c">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Xf5QTs2NLRc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>    </div>
    <br>
    <br>
    <form id="signup-form" @submit.prevent="processForm('none')">
    <div class="sw-t">
    <ul class="con-s" style="display:flex;">
      SW1<vs-switch style="margin-right:auto; position: relative;" v-model="switch1" v-on:change="processForm('SW1:' + switch1)"/>
      SW2<vs-switch style="margin-right:auto; position: relative;" color="success" v-model="switch2" v-on:change="processForm('SW2:' + switch2)"/>
      SW3<vs-switch style="margin-right:auto; position: relative;" color="danger" v-model="switch3" v-on:change="processForm('SW3:' + switch3)"/>
      SW4<vs-switch style="margin-right:auto; position: relative;" color="dark" v-model="switch4" v-on:change="processForm('SW4:' + switch4)"/>
  </ul>
  
  <br>
  <br>
  </div>
    <div class="box-b">
    <div><strong><h3>LAT</h3></strong></div>
    <div><vs-slider :color="colorx" v-model="alt" v-on:change="processForm(alt)"/></div>
    <vs-button v-on:keyup.up="processForm('up')" v-on:keyup.down="processForm('down')" v-on:keyup.right="processForm('right')" v-on:keyup.left="processForm('left')"  color="dark" type="filled">Click to Start Manual Control</vs-button>
    </div>
    </form>
    <vs-popup
      style="color:rgb(255,255,255)"
      background-color="rgba(255,255,255,.6)"
      :background-color-popup="colorx" title="START MANUAL CONTROL" :active.sync="popupActivo5">
      <p>
        To Start Manual Control, Click On The Area Shown Then Use Your Keypad!
      </p>
    </vs-popup>
</div>
</template>
<style>
#inner {
  display: table;
  margin: 0 auto;
  border: 1px solid black;
}
#box-c {
  width:100%
}
.col-r {
  float: right;
  width: 100px;
  padding: 10px;
}
.col-l {
  float: left;
  width: 20px;
  padding: 10px;
}
.box-l {
  position: absolute;
  left: 21%;
  width: 100px;
}
.box-r {
  position: absolute;
  right: 21%;
  width: 100px;
}
.top-h {
  width: 100%;
  padding: 0;
}
.sw-t {
  margin: auto;
  width: 50%;
}
.box-r-2 {
  position: absolute;
  right: 11%;
  width: auto;
}
.box-l-2 {
  position: absolute;
  left: 5%;
  width: auto;
}
.battery-icon {
  position: absolute;
  width: 80%;
  height: 60px;
  border-radius: 10px;
  border: 5px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.battery-icon:before {
    content: '';
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    width: 15px;
    height: 30px;
    border-radius: 5px;
    background:  black;
}
.battery-icon:after {
  content: '';
  position: absolute;
  left: 0px;
  top: 0px;
  width: 80%;
  height: 52px;
  background-color: green;
  border-radius: 5px;
}
body{
  text-align: center;
}
.compass {
	width: 220px;
	height: 220px;
	background-color: #F3F3F3;
  border-radius: 100%;
  background-image: -webkit-linear-gradient(top, #583f3fab, #ECECEC);
  position: relative;
  margin: 0;
}

.compass-inner {
	width: 200px;
	height: 200px;
	background-color: #3D3D3D;
	border-radius: 100%;
	position: relative;
    left: 10px;
    top: 10px;
	border: 3px solid #c5c5c569;
}

.main-arrow {
	height: 100%;
	width: 30px;
  left: 85px;
  /* bottom: 0px; */
	position: relative;
	padding-top: 15px;
	box-sizing:border-box;
  transform: rotate(20deg);
	animation: spin 2.0s alternate infinite;
	-ms-transform: rotate(20deg);
	-o-transform: rotate(20deg);
	-o-animation: spin 2.0s alternate infinite;
	-moz-transform: rotate(20deg);
	-moz-animation: spin 2.0s alternate infinite;
	-webkit-transform: rotate(20deg);
	-webkit-animation: spin 2.0s alternate infinite;
	
}

.arrow-up {
	width: 0; 
	height: 0;
	border-left: 15px solid transparent;
	border-right: 15px solid transparent;
	border-bottom: 80px solid #EF5052;
	position: relative;
}

.arrow-down {
	-webkit-transform: rotate(180deg); /* Safari and Chrome */
	width: 0; 
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
	height: 0;
	border-left: 15px solid transparent;
	border-right: 15px solid transparent;
	border-bottom: 80px solid #F3F3F3;
	position: relative;
}

.north {
	font-size: 20px;
	font-family: 'Lobster Two', cursive;
	color: #FFF;
	position: absolute;
	left: 45%;
	top: 0px;
}

.east {
	font-size: 20px;
	font-family: 'Lobster Two', cursive;
	color: #FFF;
	position: absolute;
	left: 170px;
	top: 45%;
}

.west {
	font-size: 20px;
	font-family: 'Lobster Two', cursive;
	color: #FFF;
	position: absolute;
	left: 0px;
	top: 45%;
}

.south {
	font-size: 20px;
	font-family: 'Lobster Two', cursive;
	color: #FFF;
	position: absolute;
	left: 45%;
	top: 165px;
}

@keyframes spin {
    0%{
        transform:scale(1) rotate(0deg);
    }
	50% {
		transform:scale(1) rotate(80deg);
	}
	100% {
		transform:scale(1) rotate(-180deg);
	}
}

@-o-keyframes spin {
    0%{
        -webkit-transform:scale(1) rotate(0deg);
    }
	50% {
		-webkit-transform:scale(1) rotate(80deg);
	}
	100% {
		-webkit-transform:scale(1) rotate(-180deg);
	}
}

@-moz-keyframes spin {
    0%{
        -webkit-transform:scale(1) rotate(0deg);
    }
	50% {
		-webkit-transform:scale(1) rotate(80deg);
	}
	100% {
		-webkit-transform:scale(1) rotate(-180deg);
	}
}

@-webkit-keyframes spin {
    0%{
        -webkit-transform:scale(1) rotate(0deg);
    }
	50% {
		-webkit-transform:scale(1) rotate(80deg);
	}
	100% {
		-webkit-transform:scale(1) rotate(-180deg);
	}
}

@media (max-width: 600px) {
  .compass {
    width: 200px;
	height: 200px;
	text-align: center;
  }
  
  .compass-inner {
	  width: 170px;
	  height: 170px;
	  left: 13px;
	  top: 13px;
  }
  
  .main-arrow {
	width: 30px;
	left: 78px;
	width: 15px;
	padding-top: 3px;
  }
  
  .arrow-up {
	border-bottom: 82.5px solid #EF5052;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
  }
  
   .arrow-down {
	border-bottom: 82.5px solid #F3F3F3;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
  }
  
  .north {
	  left: 78px;
	  top: 10px;
	  font-size: 16px;
  }
  
  .south {
	  font-size: 16px;
	  left: 78px;
	  top: 140px;
  }
  
  .east {
	  font-size: 16px;
	  top: 72.5px;
	  left: 145px;
  }
  
  .west {
	  font-size: 16px;
	  left: 10px;
	  top: 72.5px;
  }
}


@media (max-width: 600px) {
  .compass {
    width: 200px;
	height: 200px;
	text-align: center;
  }
  
  .compass-inner {
	  width: 170px;
	  height: 170px;
	  left: 13px;
	  top: 13px;
  }
  
  .main-arrow {
	width: 30px;
	left: 78px;
	width: 15px;
	padding-top: 3px;
  }
  
  .arrow-up {
	border-bottom: 82.5px solid #EF5052;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
  }
  
   .arrow-down {
	border-bottom: 82.5px solid #F3F3F3;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
  }
  
  .north {
	  left: 78px;
	  top: 10px;
	  font-size: 16px;
  }
  
  .south {
	  font-size: 16px;
	  left: 78px;
	  top: 140px;
  }
  
  .east {
	  font-size: 16px;
	  top: 72.5px;
	  left: 145px;
  }
  
  .west {
	  font-size: 16px;
	  left: 10px;
	  top: 72.5px;
  }
}

@media (max-width: 600px) {
  .compass {
    width: 200px;
	height: 200px;
	text-align: center;
  }
  
  .compass-inner {
	  width: 170px;
	  height: 170px;
	  left: 13px;
	  top: 13px;
  }
  
  .main-arrow {
	width: 30px;
	left: 78px;
	width: 15px;
	padding-top: 3px;
  }
  
  .arrow-up {
	border-bottom: 82.5px solid #EF5052;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
  }
  
   .arrow-down {
	border-bottom: 82.5px solid #F3F3F3;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
  }
  
  .north {
	  left: 78px;
	  top: 10px;
	  font-size: 16px;
  }
  
  .south {
	  font-size: 16px;
	  left: 78px;
	  top: 140px;
  }
  
  .east {
	  font-size: 16px;
	  top: 72.5px;
	  left: 145px;
  }
  
  .west {
	  font-size: 16px;
	  left: 10px;
	  top: 72.5px;
  }
}

@media (max-width: 600px) {
  .compass {
    width: 200px;
	height: 200px;
	text-align: center;
  }
  
  .compass-inner {
	  width: 170px;
	  height: 170px;
	  left: 13px;
	  top: 13px;
  }
  
  .main-arrow {
	width: 30px;
	left: 78px;
	width: 15px;
	padding-top: 3px;
  }
  
  .arrow-up {
	border-bottom: 82.5px solid #EF5052;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
  }
  
   .arrow-down {
	border-bottom: 82.5px solid #F3F3F3;
	border-left: 7.5px solid transparent;
	border-right: 7.5px solid transparent;
  }
  
  .north {
	  left: 78px;
	  top: 10px;
	  font-size: 16px;
  }
  
  .south {
	  font-size: 16px;
	  left: 78px;
	  top: 140px;
  }
  
  .east {
	  font-size: 16px;
	  top: 72.5px;
	  left: 145px;
  }
  
  .west {
	  font-size: 16px;
	  left: 10px;
	  top: 72.5px;
  }
}
</style>
<script>
export default {
  props: ['d_id'],
  data() {
    return {
       color:'#5a3cc4',
      switch1:false,
      switch2:false,
      switch3:false,
      switch4:false,
      colorx:"#4a5153",
      popupActivo5:false,
      alt:0,
      status: {
          droneID: 0,
          batteryVolts: 0,
          location: {
              lat: 0,
              lng: 0,
              alt: 0,
          },
          status: '',
          roll: 0,
          yaw: 0,
          pitch: 0,
          direction: '',
          speed: 0,
          numMotors: 0,
          missionStartedBy: '',
          missionStartedAt: '',
      },
        id: null,
        messages: {},
    }
  },
  mounted: function(){
    this.popupActivo5=true;
    // window.addEventListener('scroll', this.noScroll);
    this.$nextTick(function (){
      this.listen(this.d_id);
      axios.get(`/status/drones/${this.d_id}/startSendingStatus`);
    });
  },
  methods: {
    listen: function(id){
        Echo.channel(`drone.${id}`)
                .listen('Status',(event) => {
                    console.log(event);
                    this.status = event;
                });
      },
    noScroll: function() {
      window.scrollTo(0, 0);
    },
    processForm: function(direction) {
        // console.log({ name: this.name, email: this.email });
        // alert('name=name/' + this.name + '/email/' + this.email);
        // var url = `/status/drones/${this.id}/fetchStatusDrone`;
        var url = `/takeover/${this.d_id}/${direction}`;
        axios.get(url);
        console.log(url);
        // axios.get(url);
        // this.listen();
        },
  }
}
</script> 