<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Drone;
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

    public function fetchStatusDrone($droneID)
    {   
        event(new NewDrone($droneID, "get-status"));
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
