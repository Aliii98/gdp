@extends('layouts.app')

@section('content')
<manual-control v-bind:d_id="{{$droneID}}"></manual-control>
@endsection
@section('headscripts')
<script>
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
</script>
@endsection
