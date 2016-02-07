
angular.module('headout', ['ionic','headout.controllers', 'ngCordova.plugins.localStorage'])

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'homeController'
            })

            .state('make-my-day', {
                url: '/make-my-day',
                templateUrl: 'views/make-my-day.html',
                controller: 'makeController'
            })

            .state('results', {
                url: '/results',
                templateUrl: 'views/results.html',
                controller: 'resultsController'
            })

        $urlRouterProvider.otherwise("/home");

    })


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
