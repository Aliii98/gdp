<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Drone;
use Auth;
use App\Events\NewDrone;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $drones = Drone::where('deployed_by', Auth::user()->id)->get();
        return view('home')->with('drones' , $drones);
    }
    public function takeover()
    {
        return view('takeover');
        // return view('test', ['drone' => $droneID]);
    }
    public function manualControl($droneID,$direction)
    {
        event(new NewDrone($droneID, $direction));
    }
    public function test()
    {
        return view('test');
    }
}
