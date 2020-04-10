<!DOCTYPE html>
<html>
  <head>
    <title>Custom Markers</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(
            document.getElementById('map'),
            {center: new google.maps.LatLng(-33.91722, 151.23064), zoom: 16});

        var iconBase =
            'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
        var drone = {
            url: 'https://i2.wp.com/fynyty.com/wp-content/uploads/2015/11/drone.png?ssl=1',
            size: new google.maps.Size(200, 200),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(75, 75)
        };
        var icons = {
          parking: {
            url: 'http://maps.google.com/mapfiles/kml/shapes/airports.png',
            size: new google.maps.Size(25, 25),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
            },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };

        var features = [
          {
            position: new google.maps.LatLng(-33.91721, 151.22630),
            type: 'info'
          },{
            position: new google.maps.LatLng(-43.91725, 121.23011),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-35.91872, 155.23089),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91784, 151.23094),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91682, 151.23149),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91790, 151.23463),
            type: 'info'
          }, {
            position: new google.maps.LatLng(-33.91666, 151.23468),
            type: 'info'
          },{
            position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
            type: 'parking'
          },{
            position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
            type: 'library'
          }
        ];

        // Create markers.
        for (var i = 0; i < features.length; i++) {
            var marker = new google.maps.Marker({
            position: features[i].position,
            icon: drone,
            map: map
        });
  };
      }
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJdIEzZHJI_CsVxC62OfSDbCLkZYwXKi0&callback=initMap">
    </script>
  </body>
</html>