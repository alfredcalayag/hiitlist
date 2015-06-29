// IndexCtrl.js

myApp.controller('IndexCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

// Get all registered users
  $http.get("../users").success(function(response, body){
    $scope.users = response.users;
  })
  .error(function() {
    console.log("Failed to load user data.");
  });

  $scope.createUser = function(user){
    $http.post("../users/", {user})
      .success(function(data){
        $scope.users = data.users;
        $scope.newUser.name = "";
        $scope.newUser.email = "";
        $scope.createUserForm;
      })
      .error(function(){
        console.log("Failed to create user.");
      });
  }

  $scope.userHome = function(myId) {
    $state.go('home', {userId: myId});
  }


}]);