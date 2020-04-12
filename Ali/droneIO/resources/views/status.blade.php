@extends('layouts.app')

@section('content')
<div class="container">
    <dronestatus v-bind:drones="{{$drones}}"></dronestatus>
</div>
@endsection