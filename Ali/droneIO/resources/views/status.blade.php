@extends('layouts.app')

@section('content')
<div class="container">
    <h1> STATUS IS HERE ::: </h1>
    <status></status>
</div>

<!-- <div class="media" style="margin-top:20px;" v-for="status in statuss">
      <div class="media-left">
        <a href="#">
          <img class="media-object" src="http://placeimg.com/80/80" alt="...">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">Status: </h4>
        <p>
          @{{status.body}}
        </p>
      </div>
    </div> -->
@endsection

<!-- @section('scripts')
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        statuss: {},
      },
      mounted() {
        this.getStatus();
        this.listen();
      },
      methods: {
        getStatus() {
          axios.get('/getStatusNow')
                .then((response) => {
                  this.statuss = response.data
                })
                .catch(function (error) {
                  console.log(error);
                });
        },
        listen() {
          Echo.channel('home')
              .listen('NewMessage2', (msg) => {
                this.statuss.unshift(msg);
              });
            }
        }
      });
  </script>
@endsection -->
