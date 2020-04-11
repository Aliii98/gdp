<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Drone;

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
        $drones = Drone::all();
        return view('home')->with('drones' , $drones);
    }
    public function test()
    {
        $drones = Drone::all();
        return view('test')->with('drones' , $drones);
    }
}
