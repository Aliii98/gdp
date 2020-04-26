<?php
 use App\Events\NewMessage;
 use App\Events\GetStatus;
//  use Auth;
 use App\Drone;
 use App\Mission;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    
    return view('welcome');
});

Auth::routes();
Route::get('/map/{droneID}', function(){
    $drones = Drone::where('deployed_by', Auth::user()->id)->get();
    // return view('map')->with('lat' , 53.807545);
    return view('map');
});
Route::get('/mission/{droneID}', function(){
    $drones = Drone::where('deployed_by', Auth::user()->id)->get();
    // return view('map')->with('lat' , 53.807545);
    return view('mission')->with('mission_id', Mission::count()+1);
});
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/takeover/{droneID}', 'HomeController@takeover');
Route::get('/test', 'HomeController@test');
Route::get('/takeover/{droneID}/{direction}', 'HomeController@manualControl');
Route::get('/status/{droneID}', 'DronesController@getStatus');
Route::get('drones/getNewId', 'DronesController@getNewId');
Route::resource('drones', 'DronesController');
Route::post('drones/{droneID}/online', 'DronesController@goOnline');
Route::post('drones/{droneID}/offline', 'DronesController@goOffline');
Route::get('status/drones/{droneID}/fetchStatusDrone', 'DronesController@fetchStatusDrone');
Route::get('status/drones/{droneID}/startSendingStatus', 'DronesController@startSendingStatus');
Route::get('status/drones/{droneID}/stopSendingStatus', 'DronesController@stopSendingStatus');
Route::post('/mission/{droneID}/startMission', 'DronesController@sendJourney');
Route::post('/mission/{droneID}/storeMission', 'DronesController@storeMission');
Route::post('/mission/{droneID}/storeWaypoints', 'DronesController@storeWaypoints');
// PUSHER_APP_ID=961713
// PUSHER_APP_KEY=678f6efe1ac1e203bb90
// PUSHER_APP_SECRET=163bd9b969d75879b039
// PUSHER_APP_CLUSTER=eu


