<?php

namespace App\Http\Controllers;

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
    public function index()
    {   
        $drones = Drone::all();
        return view('status')->with('drones' , $drones);
    }
    
    public function fetchStatus()
    {
        //return Drone::with('user')->get();
       broadcast(new NewMessage('get-status'));
    }

    public function getNewId()
    {   
        $count = Drone::count();
        $id = $count + 1;
        broadcast(new NewMessage($id));
        // broadcast(new NewMessage($count+2));
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
        //file_put_contents('debug.txt', $drone->status);
        try{
            $drone = new Drone;
            $drone->airframe = $request->input('airframe');
            $drone->deployed_by = $request->input('deployed_by');
            //$drone->status = $request->input('status');
            // $drone->airfame = 'airframe';
            // $drone->deployed_by = 'deployed_by';
            // $drone->status = 'status';
            //$drone->id = 52;
            // $drone->created_at = '';
            // $drone->updated_at = '';
            //broadcast(new NewMessage('2222'));

            $drone->save();
            //broadcast(new NewMessage('3333'));

        } catch(Exception $e){
            echo $e->getMessage();
            file_put_contents('debug.txt', 'ERRORRRRR!!!!!!!!');
        }
        // return view('events');
        // file_put_contents('debug.txt', $request, FILE_APPEND);
        // file_put_contents('debug.txt', $request);
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
}
