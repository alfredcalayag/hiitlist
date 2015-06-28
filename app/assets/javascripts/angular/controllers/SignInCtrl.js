// SignInCtrl.js

myApp.controller('SignInCtrl', ['$scope', '$location', function($scope, $location) {

$scope.signIn = function() {
  $location.path('/home')
}

}]);