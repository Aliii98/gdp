@extends('layouts.app')

@section('content')
<heatmap></heatmap>
@endsection
@section('headscripts')
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJdIEzZHJI_CsVxC62OfSDbCLkZYwXKi0&libraries=visualization">
</script>
@endsection