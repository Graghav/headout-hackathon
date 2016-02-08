angular

.module('headout-webapp')

.controller('HomeController', function($scope, EventService){
    // Init the events
    $scope.events = [];

    setInterval(function(){
      $(".slider").flexslider({ minItems: 3, maxItems: 3, move: 3, animation: "slide"  });

    },100)

    $scope.vm = {};

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

  $scope.beginTime = "9.00";

  $scope.endTime  = "17.00";

  var d = new Date();

  var current = {
    date  : d.getDate(),
    month : d.getMonth(),
    year  : d.getYear()
  };
  

  $scope.getImage = function(image) {
    return 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(http://localhost:3000/assets/img/events/'+image+')';
  }

  $scope.filterEvents = function() {
    // Filter the events
    var tags   = _.pluck($scope.tags,'text');
    var ntags  = _.pluck($scope.negtags, 'text');
    // Find time diff
    var date1 = new Date(current.year, current.month, current.date,  $scope.beginTime.slice(0,$scope.beginTime.indexOf(".")), 0);
    var date2 = new Date(current.year, current.month, current.date,  $scope.endTime.slice(0, $scope.endTime.indexOf(".")), 0);

    if (date2 < date1) {
      date2.setDate(date2.getDate() + 1);
    }

    tmpTime = date2 - date1;
    $scope.time = Math.floor(tmpTime / 1000 / 60);

    EventService.getFilterEvents(tags,ntags).then(function(response) {
      $scope.events = response.data;
      var tmpFilter =  _.sortBy(EventService.filterEvents($scope.events, $scope.time, $scope.budget), function(events){
        return events.length;
      }).reverse();

    //  $scope.filtered = tmpFilter;

      tmpFilter = _.filter(tmpFilter, function(t){
        return t.price <= $scope.budget;
      })

      if(tmpFilter[0].events.length >= $scope.events.length-1){
        $scope.filtered = tmpFilter.splice(0,1);
      }
      else {
        $scope.filtered = tmpFilter.splice(0,2);
      }
      $scope.locations = EventService.getCoordinates($scope.filtered[0].events);
    });
  }

  $scope.showMap = 0;

  EventService.getAllEvents()
  .then(function(response){
    $scope.events = response.data;
  });
})
