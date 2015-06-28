// IndexCtrl.js

myApp.controller('IndexCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

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

  $scope.userHome = function(userId) {
    $location.path('/home').search({id: userId});
  }

  $http.get("../users/").success(function(response, body){
    console.log(response);
    $scope.users = response.users;
    console.log($scope.users[0]);

  }).error(function() {
    console.log("Failed to load user data.");
  });

}]);