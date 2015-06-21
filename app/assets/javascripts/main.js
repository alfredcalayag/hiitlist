// main.js
// Main Angular Controller

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

// Add routes here
  $routeProvider.when('/', {
    templateUrl: "../templates/signin.html",
    controller: 'SignInCtrl'
  })
  .when('/home', {
    templateUrl: "../templates/home.html",
    controller: 'HomeCtrl'
  })
  .when('/test', {
    templateUrl: "../templates/test.html",
    controller: 'ListCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
