// HomeCtrl.js
myApp.controller('HomeCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {


  $scope.createWorkout = function(listData){
    $http.post("../users/" + $scope.userId + "/lists/", {user_id: $scope.userId, name: listData.name})
      .success(function(data){
        console.log("Successfully created a new workout list");
        console.log(data);
        $scope.lists = data.lists;
        $scope.newWorkout.name = "";
      })
      .error(function(){
        console.log("Failed to create user.");
      });
  }

  $scope.showList = function(listId) {
    $location.path('/list').search({id: listId});
  }

  //Add scope variables
  $scope.userId = $location.search().id;


  $http.get("http://localhost:3000/users/" + $scope.userId).success(function(response, body){
    console.log(response);
    $scope.userName = response.user.name;
    $scope.lists = response.lists;
  }).error(function() {
    console.log("Failed to load user data.");
  })

}]);