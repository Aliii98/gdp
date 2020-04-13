@extends('layouts.app')

@section('content')
<status></status>
@endsection
@section('headscripts')
<script>
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
</script>
@endsection
