@extends('layouts.app')

@section('content')
<div id="outer">
<iframe class="inner" id="inner" width="560" height="315" src="https://www.youtube.com/embed/F109TZt3nRc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
    @endsection
@section('headscripts')
<style>
#inner {
  display: table;
  margin: 0 auto;
  border: 1px solid black;
}

#outer {
  width:100%
}

</style>
@endsection
