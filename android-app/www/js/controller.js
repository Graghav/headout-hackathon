/* global angular, document, window */
'use strict';

var URL = "http://localhost:2000";

var IMAGE_URL = "http://localhost:3000";

angular.module('headout.controllers', ['ngCordova.plugins.localStorage'])

.controller('utils', function($scope, $location, $ionicHistory){

	$scope.go = function ( path ) {
	  if( path == 'back') {
	  	$ionicHistory.goBack();
	  }
	  else {
	  	$location.path( path );
	  }
	};
})

.controller('homeController', function($scope, $state, $ionicPopup, $http, $cordovaLocalStorage) {

		function getEvents() {
			 return	$http({
							method: 'GET',
							url: URL+"/events/all"
						});
		}

		$scope.events = [];

		$scope.getImageURL = function(image) {
			return 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url('+IMAGE_URL+'/assets/img/events/'+image+')';
		}

		getEvents().then(function(response){
			$scope.events = response.data;
			$cordovaLocalStorage.setItem('events', JSON.stringify($scope.events));
		})

})

.controller('makeController', function($scope, $state, $cordovaLocalStorage){

		var d = new Date();

		var current = {
			date  : d.getDate(),
			month : d.getMonth(),
			year  : d.getYear()
		};

		$scope.formData = {};

		$scope.saveFilter = function() {
			// Find time diff
			var date1 = new Date(current.year, current.month, current.date,  $scope.formData.fromTime.slice(0,$scope.formData.fromTime.indexOf(".")), 0);
			var date2 = new Date(current.year, current.month, current.date,  $scope.formData.toTime.slice(0, $scope.formData.toTime.indexOf(".")), 0);
			if (date2 < date1) {
				date2.setDate(date2.getDate() + 1);
			}

			var tmpTime = date2 - date1;
			$scope.formData.time = Math.floor(tmpTime / 1000 / 60);

			$scope.formData.tags = $scope.formData.tags.split(",");
			$scope.formData.ntags = ($scope.formData.ntags) ? ($scope.formData.ntags.split(",")) : []
			var data = JSON.stringify($scope.formData);
			$cordovaLocalStorage.setItem('filter',data);
			$state.go('results');
		}
})

.controller('resultsController', function($scope, $state, $http,$cordovaLocalStorage){

		$scope.events = JSON.parse($cordovaLocalStorage.getItem('events'));

		$scope.filter	= JSON.parse($cordovaLocalStorage.getItem('filter'));

		$scope.getImageURL = function(image) {
			return 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url('+IMAGE_URL+'/assets/img/events/'+image+')';
		}

		// Get the filtered data
		function getFilterEvents(tags,ntags) {
			return 	$http({
			          method: 'POST',
			          url: URL+"/events/filter",
			          data: { tags: tags, ntags: ntags }
			    });
		}


		  function filterEvents(events, time){
		      var combined = combination(events);
		      var tmp_price = 0;
		      var reduced = _.map(combined, function(c){

		        tmp_price = 0;

		        _.each(c, function(x,i) {
		               tmp_price += x.price;
		         })

		        return { events: c,
		                 time: (c.length == 1) ? (c[0].total_time) : _.reduce(c, function(e,d) {
		                          return (e.total_time || 0) + (d.total_time || 0)
		                        }, 0),
		                 price: tmp_price
		        }
		      })


		      return _.filter(reduced, function(r){
		        return r.time <= time;
		      })
		  }

		getFilterEvents($scope.filter.tags, $scope.filter.ntags).then(function(res){
			$scope.filteredEvents = res.data;
			// Sort by the descreasing order of events
			var tmpFilter =  _.sortBy(filterEvents($scope.filteredEvents, $scope.filter.time, $scope.filter.budget), function(events){
				return events.length;
			}).reverse();
			// Filter based on pricing
			tmpFilter = _.filter(tmpFilter, function(t){
				return t.price <= $scope.filter.budget;
			});
			// Assign Filtered events
			if(tmpFilter[0].events.length >= $scope.events.length-1){
				$scope.filtered = tmpFilter.splice(0,1);
			}
			else {
				$scope.filtered = tmpFilter.splice(0,2);
			}

		});

})
