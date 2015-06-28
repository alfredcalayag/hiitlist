// main.js
// Main Angular Controller

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

// Add routes here
  $routeProvider.when('/', {
    templateUrl: "../templates/index.html",
    controller: 'IndexCtrl'
  })
  .when('/home', {
    templateUrl: "../templates/home.html",
    controller: 'HomeCtrl'
  })
  .when('/list', {
    templateUrl: "../templates/list.html",
    controller: 'ListCtrl'
  })
  .when('/workout',{
    templateUrl: "../templates/workout.html",
    controller: 'WorkoutCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
