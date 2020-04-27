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
var droneID=9;
droneDeployed(droneID);
// var droneID=9;
// droneDeployed(droneID);
// var droneID=8;
// droneDeployed(droneID);
// var deployed_by = 1;
// var airframe = "Quad+";
// newDrone();
// fetchStatus(1);
// pusher.trigger('drone.6', 'App\\Events\\NewMessage', 'HELLOOOOOOOOO');
var hdr;
// lat:53.782551, lng:-1.445368
var status = {
    droneID: droneID,
    batteryVolts: 12.20,
    location: {
        lat: 53.782551,
        lng: -1.445368,
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
        else if (data.header == 'get-heatmap'){
            console.log(data);
            setTimeout(getHeat, 500, id);
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

function getHeat(id){
    console.log('Getting HeatMap Now');
    var heatmap = getPoints();
    var msg = {
        header: 'heatmap',
        data: heatmap,
        // data: 'hello!!!!',
    };
    pusher.trigger(`drone.${id}`, 'App\\Events\\Status', msg);
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

function getPoints() {
    return [
      {lat:53.782551, lng:-1.445368},
      {lat:53.782745, lng:-1.444586},
      {lat:53.782842, lng:-1.443688},
      {lat:53.782919, lng:-1.442815},
      {lat:53.782992, lng:-1.442112},
      {lat:53.783100, lng:-1.441461},
      {lat:53.783206, lng:-1.440829},
      {lat:53.783273, lng:-1.440324},
      {lat:53.783316, lng:-1.440023},
      {lat:53.783357, lng:-1.439794},
      {lat:53.783371, lng:-1.439687},
      {lat:53.783368, lng:-1.439666},
      {lat:53.783383, lng:-1.439594},
      {lat:53.783508, lng:-1.439525},
      {lat:53.783842, lng:-1.439591},
      {lat:53.784147, lng:-1.439668},
      {lat:53.784206, lng:-1.439686},
      {lat:53.784386, lng:-1.439790},
      {lat:53.784701, lng:-1.439902},
      {lat:53.784965, lng:-1.439938},
      {lat:53.785010, lng:-1.439947},
      {lat:53.785360, lng:-1.439952},
      {lat:53.785715, lng:-1.440030},
      {lat:53.786117, lng:-1.440119},
      {lat:53.786564, lng:-1.440209},
      {lat:53.786905, lng:-1.440270},
      {lat:53.786956, lng:-1.440279},
      {lat:53.800224, lng:-1.433520},
      {lat:53.800155, lng:-1.434101},
      {lat:53.800160, lng:-1.434430},
      {lat:53.800378, lng:-1.434527},
      {lat:53.800738, lng:-1.434598},
      {lat:53.800938, lng:-1.434650},
      {lat:53.801024, lng:-1.434889},
      {lat:53.800955, lng:-1.435392},
      {lat:53.800886, lng:-1.435959},
      {lat:53.800811, lng:-1.436275},
      {lat:53.800788, lng:-1.436299},
      {lat:53.800719, lng:-1.436302},
      {lat:53.800702, lng:-1.436298},
      {lat:53.800661, lng:-1.436273},
      {lat:53.800395, lng:-1.436172},
      {lat:53.800228, lng:-1.436116},
      {lat:53.800169, lng:-1.436130},
      {lat:53.800066, lng:-1.436167},
      {lat:53.784345, lng:-1.422922},
      {lat:53.784389, lng:-1.422926},
      {lat:53.784437, lng:-1.422924},
      {lat:53.784746, lng:-1.422818},
      {lat:53.785436, lng:-1.422959},
      {lat:53.786120, lng:-1.423112},
      {lat:53.786433, lng:-1.423029},
      {lat:53.786631, lng:-1.421213},
      {lat:53.786660, lng:-1.421033},
      {lat:53.786801, lng:-1.420141},
      {lat:53.786823, lng:-1.420034},
      {lat:53.786831, lng:-1.419916},
      {lat:53.787034, lng:-1.418208},
      {lat:53.787056, lng:-1.418034},
      {lat:53.787169, lng:-1.417145},
      {lat:53.787217, lng:-1.416715},
      {lat:53.786144, lng:-1.416403},
      {lat:53.785292, lng:-1.416257},
      {lat:53.780666, lng:-1.390374},
      {lat:53.780501, lng:-1.391281},
      {lat:53.780148, lng:-1.392052},
      {lat:53.780173, lng:-1.391148},
      {lat:53.780693, lng:-1.390592},
      {lat:53.781261, lng:-1.391142},
      {lat:53.781808, lng:-1.391730},
      {lat:53.782340, lng:-1.392341},
      {lat:53.782812, lng:-1.393022},
      {lat:53.783300, lng:-1.393672},
      {lat:53.783809, lng:-1.394275},
      {lat:53.784246, lng:-1.394979},
      {lat:53.784791, lng:-1.395958},
      {lat:53.785675, lng:-1.396746},
      {lat:53.786262, lng:-1.395780},
      {lat:53.786776, lng:-1.395093},
      {lat:53.787282, lng:-1.394426},
      {lat:53.787783, lng:-1.393767},
      {lat:53.788343, lng:-1.393184},
      {lat:53.788895, lng:-1.392506},
      {lat:53.789371, lng:-1.391701},
      {lat:53.789722, lng:-1.390952},
      {lat:53.790315, lng:-1.390305},
      {lat:53.790738, lng:-1.389616},
      {lat:53.779448, lng:-1.438702},
      {lat:53.779023, lng:-1.438585},
      {lat:53.778542, lng:-1.438492},
      {lat:53.778100, lng:-1.438411},
      {lat:53.777986, lng:-1.438376},
      {lat:53.777680, lng:-1.438313},
      {lat:53.777316, lng:-1.438273},
      {lat:53.777135, lng:-1.438254},
      {lat:53.776987, lng:-1.438303},
      {lat:53.776946, lng:-1.438404},
      {lat:53.776944, lng:-1.438467},
      {lat:53.776892, lng:-1.438459},
      {lat:53.776842, lng:-1.438442},
      {lat:53.776822, lng:-1.438391},
      {lat:53.776814, lng:-1.438412},
      {lat:53.776787, lng:-1.438628},
      {lat:53.776729, lng:-1.438650},
      {lat:53.776759, lng:-1.438677},
      {lat:53.776772, lng:-1.438498},
      {lat:53.776787, lng:-1.438389},
      {lat:53.776848, lng:-1.438283},
      {lat:53.776870, lng:-1.438239},
      {lat:53.777015, lng:-1.438198},
      {lat:53.777333, lng:-1.438256},
      {lat:53.777595, lng:-1.438308},
      {lat:53.777797, lng:-1.438344},
      {lat:53.778160, lng:-1.438442},
      {lat:53.778414, lng:-1.438508},
      {lat:53.778445, lng:-1.438516},
      {lat:53.778503, lng:-1.438529},
      {lat:53.778607, lng:-1.438549},
      {lat:53.778670, lng:-1.438644},
      {lat:53.778847, lng:-1.438706},
      {lat:53.779240, lng:-1.438744},
      {lat:53.779738, lng:-1.438822},
      {lat:53.780201, lng:-1.438882},
      {lat:53.780400, lng:-1.438905},
      {lat:53.780501, lng:-1.438921},
      {lat:53.780892, lng:-1.438986},
      {lat:53.781446, lng:-1.439087},
      {lat:53.781985, lng:-1.439199},
      {lat:53.782239, lng:-1.439249},
      {lat:53.782286, lng:-1.439266},
      {lat:53.797847, lng:-1.429388},
      {lat:53.797874, lng:-1.429180},
      {lat:53.797885, lng:-1.429069},
      {lat:53.797887, lng:-1.429050},
      {lat:53.797933, lng:-1.428954},
      {lat:53.798242, lng:-1.428990},
      {lat:53.798617, lng:-1.429075},
      {lat:53.798719, lng:-1.429092},
      {lat:53.798944, lng:-1.429145},
      {lat:53.799320, lng:-1.429251},
      {lat:53.799590, lng:-1.429309},
      {lat:53.799677, lng:-1.429324},
      {lat:53.799966, lng:-1.429360},
      {lat:53.800288, lng:-1.429430},
      {lat:53.800443, lng:-1.429461},
      {lat:53.800465, lng:-1.429474},
      {lat:53.800644, lng:-1.429540},
      {lat:53.800948, lng:-1.429620},
      {lat:53.801242, lng:-1.429685},
      {lat:53.801375, lng:-1.429702},
      {lat:53.801400, lng:-1.429703},
      {lat:53.801453, lng:-1.429707},
      {lat:53.801473, lng:-1.429709},
      {lat:53.801532, lng:-1.429707},
      {lat:53.801852, lng:-1.429729},
      {lat:53.802173, lng:-1.429789},
      {lat:53.802459, lng:-1.429847},
      {lat:53.802554, lng:-1.429825},
      {lat:53.802647, lng:-1.429549},
      {lat:53.802693, lng:-1.429179},
      {lat:53.802729, lng:-1.428751},
      {lat:53.766104, lng:-1.409291},
      {lat:53.766103, lng:-1.409268},
      {lat:53.766138, lng:-1.409229},
      {lat:53.766183, lng:-1.409231},
      {lat:53.766153, lng:-1.409276},
      {lat:53.766005, lng:-1.409365},
      {lat:53.765897, lng:-1.409570},
      {lat:53.765767, lng:-1.409739},
      {lat:53.765693, lng:-1.410389},
      {lat:53.765615, lng:-1.411201},
      {lat:53.765533, lng:-1.412121},
      {lat:53.765467, lng:-1.412939},
      {lat:53.765444, lng:-1.414821},
      {lat:53.765444, lng:-1.414964},
      {lat:53.765318, lng:-1.415424},
      {lat:53.763961, lng:-1.415296},
      {lat:53.763115, lng:-1.415196},
      {lat:53.762967, lng:-1.415183},
      {lat:53.762278, lng:-1.415127},
      {lat:53.761675, lng:-1.415055},
      {lat:53.760932, lng:-1.414988},
      {lat:53.759337, lng:-1.414862},
      {lat:53.773187, lng:-1.421922},
      {lat:53.773043, lng:-1.422118},
      {lat:53.773007, lng:-1.422165},
      {lat:53.772979, lng:-1.422219},
      {lat:53.772865, lng:-1.422394},
      {lat:53.772779, lng:-1.422503},
      {lat:53.772676, lng:-1.422701},
      {lat:53.772606, lng:-1.422806},
      {lat:53.772566, lng:-1.422840},
      {lat:53.772508, lng:-1.422852},
      {lat:53.772387, lng:-1.423011},
      {lat:53.772099, lng:-1.423328},
      {lat:53.771704, lng:-1.423783},
      {lat:53.771481, lng:-1.424081},
      {lat:53.771400, lng:-1.424179},
      {lat:53.771352, lng:-1.424220},
      {lat:53.771248, lng:-1.424327},
      {lat:53.770904, lng:-1.424781},
      {lat:53.770520, lng:-1.425283},
      {lat:53.770337, lng:-1.425553},
      {lat:53.770128, lng:-1.425832},
      {lat:53.769756, lng:-1.426331},
      {lat:53.769300, lng:-1.426902},
      {lat:53.769132, lng:-1.427065},
      {lat:53.769092, lng:-1.427103},
      {lat:53.768979, lng:-1.427172},
      {lat:53.768595, lng:-1.427634},
      {lat:53.768372, lng:-1.427913},
      {lat:53.768337, lng:-1.427961},
      {lat:53.768244, lng:-1.428138},
      {lat:53.767942, lng:-1.428581},
      {lat:53.767482, lng:-1.429094},
      {lat:53.767031, lng:-1.429606},
      {lat:53.766732, lng:-1.429986},
      {lat:53.766680, lng:-1.430058},
      {lat:53.766633, lng:-1.430109},
      {lat:53.766580, lng:-1.430211},
      {lat:53.766367, lng:-1.430594},
      {lat:53.765910, lng:-1.431137},
      {lat:53.765353, lng:-1.431806},
      {lat:53.764962, lng:-1.432298},
      {lat:53.764868, lng:-1.432486},
      {lat:53.764518, lng:-1.432913},
      {lat:53.763435, lng:-1.434173},
      {lat:53.762847, lng:-1.434953},
      {lat:53.762291, lng:-1.435935},
      {lat:53.762224, lng:-1.436074},
      {lat:53.761957, lng:-1.436892},
      {lat:53.761652, lng:-1.438886},
      {lat:53.761284, lng:-1.439955},
      {lat:53.761210, lng:-1.440068},
      {lat:53.761064, lng:-1.440720},
      {lat:53.761040, lng:-1.441411},
      {lat:53.761048, lng:-1.442324},
      {lat:53.760851, lng:-1.443118},
      {lat:53.759977, lng:-1.444591},
      {lat:53.759913, lng:-1.444698},
      {lat:53.759623, lng:-1.445065},
      {lat:53.758902, lng:-1.445158},
      {lat:53.758428, lng:-1.444570},
      {lat:53.757687, lng:-1.443340},
      {lat:53.757583, lng:-1.443240},
      {lat:53.757019, lng:-1.442787},
      {lat:53.756603, lng:-1.442322},
      {lat:53.756380, lng:-1.441602},
      {lat:53.755790, lng:-1.441382},
      {lat:53.754493, lng:-1.442133},
      {lat:53.754361, lng:-1.442206},
      {lat:53.753719, lng:-1.442650},
      {lat:53.753096, lng:-1.442915},
      {lat:53.751617, lng:-1.443211},
      {lat:53.751496, lng:-1.443246},
      {lat:53.750733, lng:-1.443428},
      {lat:53.750126, lng:-1.443536},
      {lat:53.750103, lng:-1.443784},
      {lat:53.750390, lng:-1.444010},
      {lat:53.750448, lng:-1.444013},
      {lat:53.750536, lng:-1.444040},
      {lat:53.750493, lng:-1.444141},
      {lat:53.790859, lng:-1.402808},
      {lat:53.790864, lng:-1.402768},
      {lat:53.790995, lng:-1.402539},
      {lat:53.791148, lng:-1.402172},
      {lat:53.791385, lng:-1.401312},
      {lat:53.791405, lng:-1.400776},
      {lat:53.791288, lng:-1.400528},
      {lat:53.791113, lng:-1.400441},
      {lat:53.791027, lng:-1.400395},
      {lat:53.791094, lng:-1.400311},
      {lat:53.791211, lng:-1.400183},
      {lat:53.791060, lng:-1.399334},
      {lat:53.790538, lng:-1.398718},
      {lat:53.790095, lng:-1.398086},
      {lat:53.789644, lng:-1.397360},
      {lat:53.789254, lng:-1.396844},
      {lat:53.788855, lng:-1.396397},
      {lat:53.788483, lng:-1.395963},
      {lat:53.788015, lng:-1.395365},
      {lat:53.787558, lng:-1.394735},
      {lat:53.787472, lng:-1.394323},
      {lat:53.787630, lng:-1.394025},
      {lat:53.787767, lng:-1.393987},
      {lat:53.787486, lng:-1.394452},
      {lat:53.786977, lng:-1.395043},
      {lat:53.786583, lng:-1.395552},
      {lat:53.786540, lng:-1.395610},
      {lat:53.786516, lng:-1.395659},
      {lat:53.786378, lng:-1.395707},
      {lat:53.786044, lng:-1.395362},
      {lat:53.785598, lng:-1.394715},
      {lat:53.785321, lng:-1.394361},
      {lat:53.785207, lng:-1.394236},
      {lat:53.785751, lng:-1.394062},
      {lat:53.785996, lng:-1.393881},
      {lat:53.786092, lng:-1.393830},
      {lat:53.785998, lng:-1.393899},
      {lat:53.785114, lng:-1.394365},
      {lat:53.785022, lng:-1.394441},
      {lat:53.784823, lng:-1.394635},
      {lat:53.784719, lng:-1.394629},
      {lat:53.785069, lng:-1.394176},
      {lat:53.785500, lng:-1.393650},
      {lat:53.785770, lng:-1.393291},
      {lat:53.785839, lng:-1.393159},
      {lat:53.782651, lng:-1.400628},
      {lat:53.782616, lng:-1.400599},
      {lat:53.782702, lng:-1.400470},
      {lat:53.782915, lng:-1.400192},
      {lat:53.783137, lng:-1.399887},
      {lat:53.783414, lng:-1.399519},
      {lat:53.783629, lng:-1.399237},
      {lat:53.783688, lng:-1.399157},
      {lat:53.783716, lng:-1.399106},
      {lat:53.783798, lng:-1.399072},
      {lat:53.783997, lng:-1.399186},
      {lat:53.784271, lng:-1.399538},
      {lat:53.784577, lng:-1.399948},
      {lat:53.784828, lng:-1.400260},
      {lat:53.784999, lng:-1.400477},
      {lat:53.785113, lng:-1.400651},
      {lat:53.785155, lng:-1.400703},
      {lat:53.785192, lng:-1.400749},
      {lat:53.785278, lng:-1.400839},
      {lat:53.785387, lng:-1.400857},
      {lat:53.785478, lng:-1.400890},
      {lat:53.785526, lng:-1.401022},
      {lat:53.785598, lng:-1.401148},
      {lat:53.785631, lng:-1.401202},
      {lat:53.785660, lng:-1.401267},
      {lat:53.803986, lng:-1.426035},
      {lat:53.804102, lng:-1.425089},
      {lat:53.804211, lng:-1.424156},
      {lat:53.803861, lng:-1.423385},
      {lat:53.803151, lng:-1.423214},
      {lat:53.802439, lng:-1.423077},
      {lat:53.801740, lng:-1.422905},
      {lat:53.801069, lng:-1.422785},
      {lat:53.800345, lng:-1.422649},
      {lat:53.799633, lng:-1.422603},
      {lat:53.799750, lng:-1.421700},
      {lat:53.799885, lng:-1.420854},
      {lat:53.799209, lng:-1.420607},
      {lat:53.795656, lng:-1.400395},
      {lat:53.795203, lng:-1.400304},
      {lat:53.778738, lng:-1.415584},
      {lat:53.778812, lng:-1.415189},
      {lat:53.778824, lng:-1.415092},
      {lat:53.778833, lng:-1.414932},
      {lat:53.778834, lng:-1.414898},
      {lat:53.778740, lng:-1.414757},
      {lat:53.778501, lng:-1.414433},
      {lat:53.778182, lng:-1.414026},
      {lat:53.777851, lng:-1.413623},
      {lat:53.777486, lng:-1.413166},
      {lat:53.777109, lng:-1.412674},
      {lat:53.776743, lng:-1.412186},
      {lat:53.776440, lng:-1.411800},
      {lat:53.776295, lng:-1.411614},
      {lat:53.776158, lng:-1.411440},
      {lat:53.775806, lng:-1.410997},
      {lat:53.775422, lng:-1.410484},
      {lat:53.775126, lng:-1.410087},
      {lat:53.775012, lng:-1.409854},
      {lat:53.775164, lng:-1.409573},
      {lat:53.775498, lng:-1.409180},
      {lat:53.775868, lng:-1.408730},
      {lat:53.776256, lng:-1.408240},
      {lat:53.776519, lng:-1.407928},
      {lat:53.776539, lng:-1.407904},
      {lat:53.776595, lng:-1.407854},
      {lat:53.776853, lng:-1.407547},
      {lat:53.777234, lng:-1.407087},
      {lat:53.777644, lng:-1.406558},
      {lat:53.778066, lng:-1.406017},
      {lat:53.778468, lng:-1.405499},
      {lat:53.778866, lng:-1.404995},
      {lat:53.779295, lng:-1.404455},
      {lat:53.779695, lng:-1.403950},
      {lat:53.779982, lng:-1.403584},
      {lat:53.780295, lng:-1.403223},
      {lat:53.780664, lng:-1.402766},
      {lat:53.781043, lng:-1.402288},
      {lat:53.781399, lng:-1.401823},
      {lat:53.781727, lng:-1.401407},
      {lat:53.781853, lng:-1.401247},
      {lat:53.781894, lng:-1.401195},
      {lat:53.782076, lng:-1.400977},
      {lat:53.782338, lng:-1.400603},
      {lat:53.782666, lng:-1.400133},
      {lat:53.783048, lng:-1.399634},
      {lat:53.783450, lng:-1.399198},
      {lat:53.783791, lng:-1.398998},
      {lat:53.784177, lng:-1.398959},
      {lat:53.784388, lng:-1.398971},
      {lat:53.784404, lng:-1.399128},
      {lat:53.784586, lng:-1.399524},
      {lat:53.784835, lng:-1.399927},
      {lat:53.785116, lng:-1.400307},
      {lat:53.785282, lng:-1.400539},
      {lat:53.785346, lng:-1.400692},
      {lat:53.765769, lng:-1.407201},
      {lat:53.765790, lng:-1.407414},
      {lat:53.765802, lng:-1.407755},
      {lat:53.765791, lng:-1.408219},
      {lat:53.765763, lng:-1.408759},
      {lat:53.765726, lng:-1.409348},
      {lat:53.765716, lng:-1.409882},
      {lat:53.765708, lng:-1.410202},
      {lat:53.765705, lng:-1.410253},
      {lat:53.765707, lng:-1.410369},
      {lat:53.765692, lng:-1.410720},
      {lat:53.765699, lng:-1.411215},
      {lat:53.765687, lng:-1.411789},
      {lat:53.765666, lng:-1.412373},
      {lat:53.765598, lng:-1.412883},
      {lat:53.765543, lng:-1.413039},
      {lat:53.765532, lng:-1.413125},
      {lat:53.765500, lng:-1.413553},
      {lat:53.765448, lng:-1.414053},
      {lat:53.765388, lng:-1.414645},
      {lat:53.765323, lng:-1.415250},
      {lat:53.765303, lng:-1.415847},
      {lat:53.765251, lng:-1.416439},
      {lat:53.765204, lng:-1.417020},
      {lat:53.765172, lng:-1.417556},
      {lat:53.765164, lng:-1.418075},
      {lat:53.765153, lng:-1.418618},
      {lat:53.765136, lng:-1.419112},
      {lat:53.765129, lng:-1.419378},
      {lat:53.765119, lng:-1.419481},
      {lat:53.765100, lng:-1.419852},
      {lat:53.765083, lng:-1.420349},
      {lat:53.765045, lng:-1.420930},
      {lat:53.764992, lng:-1.421481},
      {lat:53.764980, lng:-1.421695},
      {lat:53.764993, lng:-1.421843},
      {lat:53.764986, lng:-1.422255},
      {lat:53.764975, lng:-1.422823},
      {lat:53.764939, lng:-1.423411},
      {lat:53.764902, lng:-1.424014},
      {lat:53.764853, lng:-1.424576},
      {lat:53.764826, lng:-1.424922},
      {lat:53.764796, lng:-1.425375},
      {lat:53.764782, lng:-1.425869},
      {lat:53.764768, lng:-1.426089},
      {lat:53.764766, lng:-1.426117},
      {lat:53.764723, lng:-1.426276},
      {lat:53.764681, lng:-1.426649},
      {lat:53.782012, lng:-1.404200},
      {lat:53.781574, lng:-1.404911},
      {lat:53.781055, lng:-1.405597},
      {lat:53.780479, lng:-1.406341},
      {lat:53.779996, lng:-1.406939},
      {lat:53.779459, lng:-1.407613},
      {lat:53.778953, lng:-1.408228},
      {lat:53.778409, lng:-1.408839},
      {lat:53.777842, lng:-1.409501},
      {lat:53.777334, lng:-1.410181},
      {lat:53.776809, lng:-1.410836},
      {lat:53.776240, lng:-1.411514},
      {lat:53.775725, lng:-1.412145},
      {lat:53.775190, lng:-1.412805},
      {lat:53.774672, lng:-1.413464},
      {lat:53.774084, lng:-1.414186},
      {lat:53.773533, lng:-1.413636},
      {lat:53.773021, lng:-1.413009},
      {lat:53.772501, lng:-1.412371},
      {lat:53.771964, lng:-1.411681},
      {lat:53.771479, lng:-1.411078},
      {lat:53.770992, lng:-1.410477},
      {lat:53.770467, lng:-1.409801},
      {lat:53.770090, lng:-1.408904},
      {lat:53.769657, lng:-1.408103},
      {lat:53.769132, lng:-1.407276},
      {lat:53.768564, lng:-1.406469},
      {lat:53.767980, lng:-1.405745},
      {lat:53.767380, lng:-1.405299},
      {lat:53.766604, lng:-1.405297},
      {lat:53.765838, lng:-1.405200},
      {lat:53.765139, lng:-1.405139},
      {lat:53.764457, lng:-1.405094},
      {lat:53.763716, lng:-1.405142},
      {lat:53.762932, lng:-1.405398},
      {lat:53.762126, lng:-1.405813},
      {lat:53.761344, lng:-1.406215},
      {lat:53.760556, lng:-1.406495},
      {lat:53.759732, lng:-1.406484},
      {lat:53.758910, lng:-1.406228},
      {lat:53.758182, lng:-1.405695},
      {lat:53.757676, lng:-1.405118},
      {lat:53.757039, lng:-1.404346},
      {lat:53.756335, lng:-1.403719},
      {lat:53.755503, lng:-1.403406},
      {lat:53.754665, lng:-1.403242},
      {lat:53.753837, lng:-1.403172},
      {lat:53.752986, lng:-1.403112},
      {lat:53.751266, lng:-1.403355}
    ];
  }