<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Drone;
use App\Events\NewMessage;
class DroneController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index()
    {
        return view('status');
    }
    public function fetchStatus()
    {
        //return Drone::with('user')->get();
        broadcast(new NewMessage('get-status'));
    }
    public function sendStatus(Request $request)
    {
        auth()->user()->drones()->create([
            'status' => $request->status
        ]);
        return ['message' => 'success'];
    }
}
