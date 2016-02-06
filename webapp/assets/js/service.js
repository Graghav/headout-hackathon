angular

.module('headout-webapp')

.factory('EventService', function($http){
  return {
    getAllEvents: getAllEvents,
    getCoordinates: getCoordinates
  };

  function getAllEvents() {
    return $http({
          method: 'GET',
          url: URL.events.all
        });
  }

  function getCoordinates(events) {
    return _.map(events, function(e){
      return { location: { lat: e.location[0], lng: e.location[1] } , stopover: true };
    })
  }

})
