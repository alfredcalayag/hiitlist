// SplashCtrl.js

myApp.controller('SplashCtrl', ['$scope', '$http', '$state', '$cookies', function($scope, $http, $state, $cookies) {

  if ($cookies.currentUserId && $cookies.currentUserId !== "signed out") {
    console.log($cookies.currentUserId);
    $state.go('home');
  }

  $scope.start = function(){
    $state.go('home');
  }

}]);