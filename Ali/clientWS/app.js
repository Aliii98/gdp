var PusherJS = require('pusher-js');
var Pusher = require('pusher');
var Promise = require("bluebird");
const process = require('process');
const readline = require('readline');
const async = require('async-kit');
var counter = 0;
var pusher = new Pusher({
    appId: 'myId',
    key: 'myKey',
    secret: 'mySecret',
    useTLS: false, // optional, defaults to false
    cluster: 'eu', // if `host` is present, it will override the `cluster` option.
    host: 'localhost', // optional, defaults to api.pusherapp.com
    port: 6001, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
    //encryptionMasterKey: ENCRYPTION_MASTER_KEY, // a 32 character long key used to derive secrets for end to end encryption (see below!)
});

const pusher_js = new PusherJS('myKey', {
    cluster: 'eu',
    wsHost: 'localhost',
    wsPort: 6001,
  });
var droneID=6;
droneDeployed(droneID);
// var droneID=9;
// droneDeployed(droneID);
// var droneID=8;
// droneDeployed(droneID);
// var deployed_by = 1;
// var airframe = "Quad+";
// newDrone();
// fetchStatus(1);
var hdr;
var status = {
    droneID: droneID,
    batteryVolts: 12.20,
    location: {
        lat: 51.909549,
        lng: -1.854928,
        alt: null,
    },
    status: "En-Route",
    roll: 1.2,
    yaw: 2.2,
    pitch: 0.3,
    direction: 'N',
    speed: 10,
    numMotors: "4",
    missionStartedBy: "Ali",
    missionStartedAt: "16:22",
};
function droneDeployed(id){
    var channelName = 'home';
    pusher.trigger(channelName, 'App\\Events\\NewMessage2', {
        header: "online",
        id: id,
    });
    channelName = `drone.${id}`;
    channel = pusher_js.subscribe(channelName);
    console.log(`Subscribed to channel: ${channelName}`);
    channel.bind('App\\Events\\NewDrone',function(data){
        hdr = data.header;
        console.log(`Received Message on channel ${channelName}: `)
        if (data.header == 'get-status'){
            console.log(data);
            setTimeout(fetchStatus, 500, id);
            // fetchStatus(id);
        }
        else if (data.header == 'manual-control'){
            console.log(data);
            // fetchStatus(id);
        }
        else if (data.header == 'stop-status'){
            console.log(data);
            hdr = 'stop-status';
        }
        else if (data.header == 'start-status'){
            console.log(data);
            startStatus(id);
        }
        else{ //mission
            console.log(JSON.parse(data.msg));
        }

    });
}
function startStatus(id){
    counter++;
    if (hdr == 'stop-status'){
        return;
    }
    else {
        setTimeout(fetchStatus, 500, id);
        return Promise.delay(3000).then(() => startStatus(id));
    }
}
function fetchStatus(id){
    console.log('Fetching Status Now');
    var num = status.batteryVolts + 0.1
    status.batteryVolts = Math.round((num + Number.EPSILON) * 100) / 100;
    num = status.location.lat + (counter / 1000000);
    status.location.lat = Math.round((num + Number.EPSILON) * 1000000) / 1000000;
    num = status.location.lng - 0.000002;
    status.location.lng = Math.round((num + Number.EPSILON) * 1000000) / 1000000;
    num = status.roll + (counter/3);
    status.roll = Math.round((num + Number.EPSILON) * 100) / 100;
    num = status.yaw + (counter*2);
    status.yaw = Math.round((num + Number.EPSILON) * 100) / 100;
    num = status.pitch - ((counter*2)/7);
    status.pitch = Math.round((num + Number.EPSILON) * 100) / 100;

    if (counter%2 == 0){
        num = status.speed + (-1 * ((counter*2)/7));
        status.speed = Math.round((num + Number.EPSILON) * 100) / 100;
    }
    else{
        num = status.speed + (2 * ((counter*2)/3));
        status.speed = Math.round((num + Number.EPSILON) * 100) / 100;
    } 
    pusher.trigger(`drone.${id}`, 'App\\Events\\Status', status);
}

function registerDrone(){
    console.log('Registering Drone..');
        pusher.trigger('home', 'App\\Events\\NewMessage2', {
            header: "register",
            airframe: airframe,
            deployed_by: deployed_by,
            is_online: true
        });
}

function newDrone(){
    var channelName = 'home';
    var channel;
    channel = pusher_js.subscribe(channelName);
    console.log(`Subscribed to channel: ${channelName}`);
    setTimeout(bindChannel, 100, channel, channelName);
    // bindChannel();
}

function bindChannel(channel, channelName){
    channel.bind('App\\Events\\NewMessage',function(data){
        var msg = Object.values(data);
        console.log(`Received Message on channel ${channelName}: `)
        console.log(msg);
        droneID = msg;
        channel.unbind();
        channel.unsubscribe(channelName);
        droneDeployed(droneID);
    });
    registerDrone();
}

function disconnect(id){
    var channelName = 'home';
    pusher.trigger(channelName, 'App\\Events\\NewMessage2', {
        header: "offline",
        id: id,
    });
}

// Using a single function to handle multiple signals
function handle(signal) {
  async.exit( 5 , 600 ) ;
}

process.on('SIGINT', handle);
process.on( 'asyncExit' , function( code , timeout , callback ) {
    console.log( `\nDisconnecting Drone #${droneID}` );
    setTimeout( function() {
        disconnect(droneID);
    }, 300 );
    console.log('Goodbye..');
});
