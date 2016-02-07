var app = angular.module('headout-webapp', ['ui.router', 'ngMap', 'ngTagsInput']);

// Config States and URLs

app.config(function($stateProvider, $urlRouterProvider){
  // Fallback URL
  $urlRouterProvider.otherwise("/home");

  // States & routes
  $stateProvider
  .state('home', {
    url: "/home",
    templateUrl: "views/home.html",
    controller: "HomeController"
  })
  .state('makemyday', {
    url: "/make-my-day",
    templateUrl: "views/make-my-day.html",
    controller: "MakeMyDayController"
  })

});
