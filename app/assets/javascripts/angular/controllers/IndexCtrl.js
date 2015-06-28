// IndexCtrl.js

myApp.controller('IndexCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

  $scope.userHome = function(userId) {
    $location.path('/home').search({id: userId});
  }

  $http.get("http://localhost:3000/users/").success(function(response, body){
    console.log(response);
    $scope.users = response.users;
    console.log($scope.users[0]);

  }).error(function() {
    console.log("Failed to load user data.");
  });

}]);