@extends('layouts.app')

@section('content')
    @role('Super-Admin')
        <droneselect v-bind:drones="{{$drones}}" role="Super-Admin"></droneselect>
    @endcan

    @role('Admin')
        <droneselect v-bind:drones="{{$drones}}" role="Admin"></droneselect>
    @endcan

    @role('Public-User')
        <droneselect v-bind:drones="{{$drones}}" role="Public-User"></droneselect>
    @endcan

@endsection
@section('headscripts')
<script>
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
</script>
@endsection