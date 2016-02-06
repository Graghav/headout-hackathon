angular

.module('headout-webapp')

.controller('HomeController', function($scope, EventService){
    // Init the events
    $scope.events = [];

    // Get all the events from the REST server
    EventService.getAllEvents()
    .then(function(response){
      $scope.events = response.data;
    })

    $scope.getImage = function(image) {
      return 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(http://localhost:3000/assets/img/events/'+image+')';
    }
})

.controller('MakeMyDayController', function($scope, EventService, NgMap) {

  $scope.events = [];
  $scope.locations = [];
  $scope.options = {
    zoom: 10
  }

  async.series([
      // Get all the events from the REST server
      function(cb){
        EventService.getAllEvents()
        .then(function(response){
          $scope.events = response.data;
          cb(null, "GOT ALL EVENTS");
        });
      },
      // Filter the co-ordinates of the events
      function(cb) {
        $scope.locations = EventService.getCoordinates($scope.events);
        cb(null, "FILTERED LOCATION CO-ORDINATES")
      }

  ], function(err, done){


      // $scope.dynMarkers = [];
      //
      // NgMap.getMap().then(function(map) {
      //   _.each($scope.events, function(e){
      //       var latLng = new google.maps.LatLng(e.location[0], e.location[1]);
      //       $scope.dynMarkers.push(new google.maps.Marker({position:latLng, map: map}));
      //   })
      //   $scope.markerClusterer = new MarkerClusterer(map, $scope.dynMarkers, {});
      // });

  });
})
