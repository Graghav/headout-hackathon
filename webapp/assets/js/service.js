angular

.module('headout-webapp')

.factory('EventService', function($http){
  return {
    getAllEvents: getAllEvents,
    getCoordinates: getCoordinates,
    getFilterEvents: getFilterEvents,
    filterEvents: filterEvents
  };

  function getAllEvents() {
    return $http({
          method: 'GET',
          url: URL.events.all
        });
  }

  function getFilterEvents(tags, ntags) {
    return $http({
          method: 'POST',
          url: URL.events.filter,
          data: { tags: tags, ntags: ntags }
    })
  }

  function getCoordinates(events) {
    return _.map(events, function(e){
      console.log(e.name)
      return { location: { lat: e.location[0], lng: e.location[1] } , stopover: true };
    })
  }

  function filterEvents(events, time){
      var combined = combination(events);

      var reduced = _.map(combined, function(c){
        return { events: c, time: (c.length == 1) ? (c[0].total_time) : _.reduce(c, function(e,d) {
            return (e.total_time || 0) + (d.total_time || 0)
          }, 0)
        }
      })

      return _.filter(reduced, function(r){
        return r.time <= time;
      })
  }

})
