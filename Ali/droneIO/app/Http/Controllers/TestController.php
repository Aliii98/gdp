<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    function statusFunc(){
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'http://localhost:9998/service/eventplanner/getStatus');
        $response->getStatusCode();// 200
        $res = $response->getBody(); // '{"id": 1420053, "name": "guzzle", ...}'
        return view('status', ['res' => $res]);
    }
    function eventsFunc(){
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'http://localhost:9998/service/planner/getEvents');
        $response->getStatusCode();// 200
        $res = $response->getBody(); // '{"id": 1420053, "name": "guzzle", ...}'
        return view('events', ['res' => $res]);
    }
}
