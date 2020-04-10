<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapController extends Controller
{
    public function index()
    {   
        $drones = Drone::all();
        return view('status')->with('drones' , $drones);
    }
}
