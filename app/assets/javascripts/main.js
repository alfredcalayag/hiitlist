// main.js
// Main Angular Controller

var myApp = angular.module('myApp', ['ui.router']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

// Redirect state:
  $urlRouterProvider.otherwise("/");

// Add routes here
  $stateProvider
    .state('index', {
      url: "",
      templateUrl: "../templates/index.html",
      controller: 'IndexCtrl'
    })
  .state('home', {
    // url: "/home/:userId",
    templateUrl: "../templates/home.html",
    params: {userId: 1},
    controller: 'HomeCtrl'
  })
  .state('list', {
    // url: "/list",
    templateUrl: "../templates/list.html",
    params: {listId: 1, userId: 1},
    controller: 'ListCtrl'
  })
  .state('workout', {
    // url: "/workout",
    templateUrl: "../templates/workout.html",
    params: {listId: 1},
    controller: 'WorkoutCtrl'
  });
}]);
