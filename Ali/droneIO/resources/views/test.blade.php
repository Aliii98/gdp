@extends('layouts.app')

@section('content')
    <droneselect v-bind:drones="{{$drones}}"></droneselect>

@endsection
@section('headscripts')
<script>
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
</script>
@endsection
