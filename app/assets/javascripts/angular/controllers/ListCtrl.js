// ListCtrl.js

myApp.controller('ListCtrl', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams) {

  // $scope.listId = $location.search().id;
  $scope.userId = $stateParams.userId;
  $scope.listId = $stateParams.listId;
  $scope.myList = "Workout List here";

  $scope.backToHome = function(){
    $state.go('home', {userId: $scope.userId});
  }

  $scope.startHIIT = function(myListId){
    $state.go('workout', {listId: myListId});
  }

  $scope.addExercise = function($newExercise){
    $http.post("../lists/" + $scope.listId + "/exercises", {list_id: $scope.listId, name: $newExercise.name})
      .success(function(data){
        // Update the list of exercises!
        $scope.exercises = data;
        $newExercise.name = "";
      })
      .error(function(){
        console.log("Failed to add new exercise.");
      })
  }

  $scope.updateTimer = function(myHighTime, myLowTime){
    $http.patch("../lists/" + $scope.listId, {id: $scope.listId, highTime: myHighTime, lowTime: myLowTime})
      .success(function(data) {
        console.log(data);
      })
      .error(function() {
        console.log("Failed to update timer");
      })
  }

  $http.get("../lists/" + $scope.listId).success(function(response, body){
    // id, name, high_time, low_time, user_id
    $scope.listId = response.list.id;
    $scope.listName = response.list.name;
    $scope.highTime = response.list.high_time;
    $scope.lowTime = response.list.low_time;
    $scope.exercises = response.exercises;
  }).error(function() {
    console.log("Failed to load the list.");
  })

}]);