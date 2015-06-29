// IndexCtrl.js

myApp.controller('IndexCtrl', ['$scope', '$location', '$http', '$state', function($scope, $location, $http, $state) {

// Get all registered users
  $http.get("../users").success(function(response, body){
    console.log(response);
    $scope.users = response.users;
    console.log($scope.users[0]);

  }).error(function() {
    console.log("Failed to load user data.");
  });

  $scope.createUser = function(user){
    $http.post("../users/", {user})
      .success(function(data){
        console.log("Successfully created a new user");
        console.log(data);
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
    // $location.path('/home').search({id: userId});
    $state.go('home', {userId: myId});
  }


}]);