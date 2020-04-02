// #!/usr/bin/env node
// var W3CWebSocket = require('websocket').w3cwebsocket;
 
// var ws = new W3CWebSocket('ws://localhost:5050/');
// //var ws = new WebSocket("ws://localhost:8090/");
// ws.onopen = function () {
//     // Websocket is connected
//     console.log("Websocket connected");
//     ws.send("Hello World");
//     //console.log("Message sent");
// };
// ws.onmessage = function (event) {
//     var msg = event.data;
//     // Message received
//     console.log("Message received = " + msg);
//     if (msg == "Send Status"){
//         sendStatus();
//         console.log("Sent Status");
//     }
// };
// ws.onclose = function () {
//     // websocket is closed.
//     console.log("Connection closed");
// };
// ws.onerror = function() {
//     console.log('Connection Error');
// };
// function sendStatus() {
//     ws.send("Status");
// };
// function sendBye() {
//     ws.send("Bye");
// };

///////////////////===========////////////////////////////////

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
console.log('Connected')
var channel = pusher_js.subscribe('home');
channel.bind('App\\Events\\NewMessage',function(data){
    console.log('Received Message: ')
    var msg = Object.values(data);
    console.log(msg);
    if (msg == 'get-status'){
        setTimeout(fetchStatus,600);
        // setTimeout(fetchStatus1,600);
    }
    else if (msg == 'get status'){
        console.log('Error');
    }
});

function fetchStatus(){
    console.log('Fetching Status Now');
    // for(var i = 0; i < 5; i++){
        pusher.trigger('home', 'App\\Events\\NewMessage2', {
            droneID: "3C1",
            numMotors: "4",
            batteryVolts: "12.2V",
            location: [{
                long: "12453.567",
                lat: "6853.684"
            }],
            missionStartedBy: "Ali",
            missionStartedAt: "16:22"
        });
    // }
}
// function fetchStatus1(){
//     console.log('Fetching Status Now');
//     for(var i = 0; i < 5; i++){
//         pusher.trigger('home', 'App\\Events\\NewMessage2', {
//             droneID: "3D5",
//             numMotors: "4",
//             batteryVolts: "12.6V",
//             location: [{
//                 long: "12453.567",
//                 lat: "6853.684"
//             }],
//             missionStartedBy: "Adrian",
//             missionStartedAt: "16:22"
//         });
//     }
// }
// setTimeout(testDrain(20), 3000);
// function testDrain(bat)
// {
//     if (bat > 0){
//         console.log("hi");
//             pusher.trigger('home', 'App\\Events\\NewMessage2', {
//                 droneID: "ZZ4",
//                 numMotors: "4",
//                 batteryVolts: bat,
//                 location: [{
//                     long: "12453.567",
//                     lat: "6853.684"
//                 }],
//                 missionStartedBy: "Ali",
//                 missionStartedAt: "16:25"
//             });
//             console.log(bat);
//             setTimeout(testDrain(bat-1), 3000);  
//     } 
// }


// pusher.trigger('home', 'App\\Events\\NewMessage2', { message: "Status-From-Sensor" });

/////////////////////////////////////////////////////////////////////////////////
// var Pusher = require('pusher');

// var pusher = new Pusher({
//   appId: 'myId',
//   key: 'myKey',
//   secret: 'mySecret',
//   useTLS: false, // optional, defaults to false
//   cluster: 'eu', // if `host` is present, it will override the `cluster` option.
//   host: 'localhost', // optional, defaults to api.pusherapp.com
//   port: 6001, // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
//   //encryptionMasterKey: ENCRYPTION_MASTER_KEY, // a 32 character long key used to derive secrets for end to end encryption (see below!)
// });
// pusher.trigger('home', 'App\\Events\\NewMessage', { message: "hello world" });
