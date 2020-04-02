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
    //broadcast(new NewMessage('message'));
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/getStatus', function() {
    return view('status', ['res' => 'status yay']);
});
Route::get('/status', 'DroneController@index');
Route::get('/fetchStatus', 'DroneController@fetchStatus');
Route::post('/sendStatus', 'WebSocketController@sendStatus');
Route::get('/getStatusTest', 'WebSocketController@getStatus');
Route::get('/getEvents', 'TestController@eventsFunc');
Route::get('/pusher', function(){
    return view('wsTest');
});

// PUSHER_APP_ID=961713
// PUSHER_APP_KEY=678f6efe1ac1e203bb90
// PUSHER_APP_SECRET=163bd9b969d75879b039
// PUSHER_APP_CLUSTER=eu


