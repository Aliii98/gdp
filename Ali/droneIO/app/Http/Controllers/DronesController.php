<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Drone;
use App\Mission;
use App\Waypoint;
use App\Events\NewMessage;
use App\Events\NewDrone;

class DronesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getStatus($droneID)
    {   
        $drones = Drone::all();
        return view('status')->with('drones', $droneID);
    }

    public function getNewId()
    {   
        $count = Drone::count();
        $id = $count + 1;
        broadcast(new NewMessage($id));
    }

    public function sendJourney(Request $request)
    {   
        // dump($request);
        // event(new NewDrone($request->input('drone_id')));
    }

    public function fetchStatusDrone($droneID)
    {   
        event(new NewDrone($droneID, 'get-status' ,"get-status"));
    }
    public function startSendingStatus($droneID)
    {   
        event(new NewDrone($droneID, 'start-status' ,"start-status"));
    }
    public function stopSendingStatus($droneID)
    {   
        event(new NewDrone($droneID, 'stop-status' ,"stop-status"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $this->validate($request, [
        //     'deployed_by' => 'required',
        //     'airframe' => 'required',
        //     'status' => 'required',
        // ]);
        try{
            $drone = new Drone;
            $drone->airframe = $request->input('airframe');
            $drone->deployed_by = $request->input('deployed_by');
            $drone->save();
            $count = Drone::count();
            broadcast(new NewMessage($count));
        } catch(Exception $e){
            echo $e->getMessage();
        }
    }
    public function storeMission(Request $request){
        try{
            $mission = new Mission;
            $mission->drone_id = $request->input('drone_id');
            $mission->start_lat = $request->input('start_lat');
            $mission->start_lng = $request->input('start_lng');
            $mission->end_lat = $request->input('end_lat');
            $mission->end_lng = $request->input('end_lng');
            $mission->completion_time = $request->input('completion_time');
            // dd($mission->getAttributes());
            $mission->save();
            
            // $journey->drone_id = $request->input('drone_id');
            $obj = new \stdClass();
            $obj->header = 'Mission';
            $obj->start_lat = $request->input('start_lat');
            $obj->start_lng = $request->input('start_lng');
            $obj->end_lat = $request->input('end_lat');
            $obj->end_lng = $request->input('end_lng');
            $obj->completion_time = $request->input('completion_time');
            event(new NewDrone($request->input('drone_id'), 'new-mission', json_encode($obj)));
            
        } catch(Exception $e){
            echo $e->getMessage();
        }
    }

    public function storeWaypoints(Request $request){
        try{
            $waypoint = new Waypoint;
            $waypoint->mission_id = $request->input('mission_id');
            $waypoint->lat = $request->input('lat');
            $waypoint->lng = $request->input('lng');
            $waypoint->save();

            $obj = new \stdClass();
            $obj->header = 'Waypoint';
            $obj->drone_id = $request->input('drone_id');
            $obj->mission_id = $request->input('mission_id');
            $obj->lat = $request->input('lat');
            $obj->lng = $request->input('lng');
            event(new NewDrone($request->input('drone_id'), 'waypoint', json_encode($obj)));
        } catch(Exception $e){
            echo $e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function goOnline($droneID){
        $drone = Drone::where('id', $droneID)->first();
        $drone->status = 'online'; //true
        $drone->save();
    }
    public function goOffline($droneID){
        $drone = Drone::where('id', $droneID)->first();
        $drone->status = 'offline'; //false
        $drone->save();
    }
}
