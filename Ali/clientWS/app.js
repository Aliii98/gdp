var PusherJS = require('pusher-js');
var Pusher = require('pusher');

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
//var id;
var deployed_by = 3;
var airframe = "Hexa-Rotor";
newDrone();
// droneDeployed(55);


function droneDeployed(id){
    channelName = `drone.${id}`;
    channel = pusher_js.subscribe(channelName);
    console.log(`Subscribed to channel: ${channelName}`);
    channel.bind('App\\Events\\NewDrone',function(data){
        var msg = Object.values(data);
        console.log(`Received Message on channel ${channelName}: `)
        console.log(data);
        if (data.msg == 'get-status'){
            fetchStatus(id);
        }
    });
}
function fetchStatus(id){
    console.log('Fetching Status Now');
    // for(var i = 0; i < 5; i++){
        pusher.trigger(channelName, 'App\\Events\\Status', {
            droneID: id,
            numMotors: "4",
            batteryVolts: "12.2V",
            location: [{
                long: "37.863567",
                lat: "44.53684"
            }],
            missionStartedBy: "Ali",
            missionStartedAt: "16:22",
            status: "En-Route",
        });
    // }
}

function registerDrone(){
    console.log('Registering Drone..');
        pusher.trigger('home', 'App\\Events\\NewMessage2', {
            header: "register",
            airframe: airframe,
            deployed_by: deployed_by
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
        var id = msg;
        channel.unbind();
        channel.unsubscribe(channelName);
        droneDeployed(id);
    });
    // setTimeout(registerDrone, 600);
    registerDrone();
}