// main.js
// Main Angular Controller

var myApp = angular.module('myApp', ['ui.router', 'ngCookies']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

// Redirect state:
  $urlRouterProvider.otherwise("/");

// Add routes here
  $stateProvider
    .state('splash', {
      url: "/",
      templateUrl: "../templates/splash.html",
      controller: 'SplashCtrl'
    })
    .state('signin', {
      // url: "/",
      templateUrl: "../templates/signin.html",
      controller: 'SignInCtrl'
    })
    .state('index', {
      templateUrl: "../templates/index.html",
      controller: 'IndexCtrl'
    })
  .state('home', {
    templateUrl: "../templates/home.html",
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
