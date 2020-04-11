<?php
 use App\Events\NewMessage;
 use App\Events\GetStatus;
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
Route::get('/mapTest', function(){
    return view('map');
});
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/test', 'HomeController@test');
Route::get('/status', 'DronesController@index');
Route::get('drones/getNewId', 'DronesController@getNewId');
Route::get('/fetchStatus', 'DronesController@fetchStatus');
Route::resource('drones', 'DronesController');
Route::get('drones/{droneID}/fetchStatusDrone', 'DronesController@fetchStatusDrone');
// PUSHER_APP_ID=961713
// PUSHER_APP_KEY=678f6efe1ac1e203bb90
// PUSHER_APP_SECRET=163bd9b969d75879b039
// PUSHER_APP_CLUSTER=eu


