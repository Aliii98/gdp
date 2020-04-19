var PusherJS = require('pusher-js');
var Pusher = require('pusher');
const process = require('process');
const readline = require('readline');
const async = require('async-kit');
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

// const pusher_js = new PusherJS('myKey', {
//     cluster: 'eu',
//     wsHost: 'localhost',
//     wsPort: 6001,
//   });
// var droneID=1;
// droneDeployed(droneID);
// var deployed_by = 2;
// var airframe = "Quad-Copter";
// newDrone();
fetchStatus(1);

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
        var msg = Object.values(data);
        console.log(`Received Message on channel ${channelName}: `)
        console.log(data);
        if (data.msg == 'get-status'){
            setTimeout(fetchStatus, 500, id);
            // fetchStatus(id);
        }
    });
}
function fetchStatus(id){
    console.log('Fetching Status Now');
        pusher.trigger(`drone.${id}`, 'App\\Events\\Status', {
            droneID: id,
            numMotors: "4",
            batteryVolts: "12.2V",
            location: {
                lat: 51.909549 + (id * 0.01),
                lng: -1.854928 + (id * 0.001),
            },
            missionStartedBy: "Ali",
            missionStartedAt: "16:22",
            status: "En-Route",
        });
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
