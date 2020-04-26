@extends('layouts.app')

@section('content')
<mission-map v-bind:mission_id="{{$mission_id}}"></mission-map>
@endsection
@section('headscripts')
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJdIEzZHJI_CsVxC62OfSDbCLkZYwXKi0">
</script>
@endsection