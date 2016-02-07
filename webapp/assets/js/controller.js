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
    zoom: 12
  }

  $scope.getImage = function(image) {
    return 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(http://localhost:3000/assets/img/events/'+image+')';
  }

  $scope.filterEvents = function() {
    var tags = _.pluck($scope.tags,'text');
    EventService.getFilterEvents(tags).then(function(response) {
      $scope.events = response.data;
      $scope.locations = EventService.getCoordinates($scope.events);
      $scope.filtered = _.sortBy(EventService.filterEvents($scope.events, $scope.time), function(events){
        return events.length;
      }).reverse();
    });
  }

  $scope.showMap = 0;

  EventService.getAllEvents()
  .then(function(response){
    $scope.events = response.data;
  });
})
