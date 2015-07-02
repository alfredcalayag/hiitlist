// HomeCtrl.js
myApp.controller('HomeCtrl', ['$scope', '$http', '$state', '$stateParams', '$cookies', function($scope, $http, $state, $stateParams, $cookies) {

  if ($cookies.currentUserId === "signed out") {
    $state.go('/');
  }

  // Get user data
  $scope.userId = $cookies.currentUserId;
  $http.get("../users/" + $scope.userId).success(function(response, body){
    $scope.userName = response.user.name;
    $scope.lists = response.lists;
  }).error(function() {
    console.log("Failed to load user data.");
  });

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

  $scope.showList = function(myListId) {
    $state.go('list', {listId: myListId, userId: $scope.userId});
  }

  $scope.signOut = function(){
    $cookies.currentUserId = "signed out";
    $state.go('signin');
  }


}]);