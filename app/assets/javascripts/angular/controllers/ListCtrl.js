// ListCtrl.js

myApp.controller('ListCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.listId = $location.search().id;
  $scope.myList = "Workout List here";

  $scope.startHIIT = function(listId){
    $location.path('/workout').search({id: listId});
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

  $http.get("../lists/" + $scope.listId).success(function(response, body){
    console.log("successful list load");
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