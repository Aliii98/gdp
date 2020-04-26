<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Drone;
use Auth;
use App\Events\NewDrone;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

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
        // $role = Role::create(['name' => 'super-admin']);
        // $role = Role::create(['name' => 'public_user']);
        
        // $permission = Permission::create(['name' => 'map view']);
        // $role->givePermissionTo($permission);
        // $permission = Permission::create(['name' => 'map view sample']);
        // $permission = Permission::create(['name' => 'manual control']);
        // $role->givePermissionTo($permission);
        // $permission = Permission::create(['name' => 'mission planning']);
        // $role->givePermissionTo($permission);
        // $permission = Permission::create(['name' => 'live feed']);
        // $role->givePermissionTo($permission);
        // $permission = Permission::create(['name' => 'thermal feed']);
        // $role->givePermissionTo($permission);
        // $permission = Permission::create(['name' => 'heatmap']);
        // $role->givePermissionTo($permission);
        // $permission = Permission::create(['name' => 'get status']);
        // $role->givePermissionTo($permission);


        $drones = Drone::where('deployed_by', Auth::user()->id)->get();
        return view('home')->with('drones' , $drones);
    }
    public function takeover($droneID)
    {
        return view('takeover')->with('droneID', $droneID);
        // return view('test', ['drone' => $droneID]);
    }
    public function manualControl($droneID,$direction)
    {
        event(new NewDrone($droneID, 'manual-control', $direction));
    }
    public function test()
    {
        return view('test');
    }
}
