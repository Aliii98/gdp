@extends('layouts.app')

@section('content')
<div class="container">
<div class="box">

<form id="signup-form" @submit.prevent="processForm">
@foreach ($drones as $drone)
<php>
{!! Form::select('drone') !!}
  <div class="field">
    <label class="label">#{{$drone->id}} , {{$drone->airframe}}</label>
    <input type="checkbox" class="input" name="id" v-model="id">
    </div>
@endforeach
  <div class="field has-text-right">
    <button type="submit" class="button is-danger">Submit</button>
  </div>
</form>
</div>
    <!-- upper row -->
    <div class="row justify-content-center">
        <!-- left col -->
        <div class="col-auto">
        <button onclick="myFunction()" >try me</button>
        <p id="demo"></p>
        <a id="map-view" href="/mapTest">
            <div class="card">
            <div class="card_image">
                    <img src="https://media.giphy.com/media/3ohhwgrL4KKPIZoTQY/giphy.gif" />
                </div>
                <div class="card_title">
                    <p>Map View</p>
                </div>
            </div>
        </a>
        <!-- end of left -->
        </div>
        <!-- center col -->
        <div class="col-auto">
        <a id="get-status" href="/status" onClick="clicked()">
            <div class="card">
            <div class="card_image">
                    <img src="https://media.giphy.com/media/hv46I8kIAhwlTeiMPj/giphy.gif" />
                </div>
            </div>
        </a>
        <!-- end of center -->
        </div>
        <!-- right col -->
        <div class="col-auto">
            <div class="card">
                <div class="card_image">
                    <!-- <img src="https://i.ibb.co/jWP6hGL/Screenshot-2020-03-27-at-13-17-05.png" class="static"> -->
                    <img src="https://i.pinimg.com/originals/94/70/48/947048a87694397d1e380c24cd6b356b.gif">
                </div>
                <div class="card_title">
                    Live Feed
                </div>
            </div>
        <!-- end of right -->
        </div>
    <!-- END OF UPPER ROW -->
    </div>
    <br>
    <br>
    <br>
       <!-- LOWER row -->
       <div class="row justify-content-center">
        <!-- left col -->
        <div class="col-auto">
            <div class="card">
            <div class="card_image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_1OIXj1RkEkWYFxxvwhizrfLBN7Pgl2pFMQsgvb84NmxkZiIi" />
                </div>
                <div class="card_title">
                    <p class="title-white">Thermal Feed</p>
                </div>
            </div>
        <!-- end of left -->
        </div>
        <!-- center col -->
        <div class="col-auto">
            <div class="card">
                <div class="card_image">
                    <img src="https://11mantras.com/Images/drone-animation-one.gif" />
                </div>
                <div class="card_title">
                    <p>Mission Planning</p>
                </div>
            </div>
        <!-- end of center -->
        </div>
        <!-- right col -->
        <div class="col-auto">
            <div class="card">
            <div class="card_image">
                <!-- <img class="static" src="https://i.ibb.co/d6s1Xcr/Screenshot-2020-03-27-at-13-08-38.png" > -->
                <img src="https://media1.giphy.com/media/vfZ7EwPyLnnRm/giphy.gif" />
                </div>
                <div class="card_title">
                    <p>Manual Takeover</p>
                </div>
            </div>
        <!-- end of right -->
        </div>
    <!-- END OF LOWER ROW -->
    </div>
</div>
@endsection
@section('scripts')
<script type="text/javascript">
window.onload = function() {
    var oFrame = document.getElementById("myframe");
    oFrame.contentWindow.document.onclick = function() {
        alert("frame contents clicked");
    };
};
</script>
@endsection

@push('scripts')
<script>
    function myFunction() {
        var person = prompt("Please enter your name", "Harry Potter");
        if (person != null) {
                document.getElementById("demo").innerHTML =
                "Hello " + person + "! How are you today?";
                axios.get("/mapTest");
        }
    }
</script>
@endpush
