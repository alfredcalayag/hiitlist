// ListCtrl.js

myApp.controller('ListCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.listId = $location.search().id;

  //Add scope variables
  $scope.myList = "Workout List here";

  $scope.addExercise = function(newExercise){
    // console.log(newExercise.name);
    $http.post("../lists/" + $scope.listId + "/exercises", {list_id: $scope.listId, name: newExercise.name})
      .success(function(data){
        $scope.exercises = data;
      })
      .error(function(){
        console.log("creation of new item failed.");
      })
  }

  $http.get("../lists/" + $scope.listId).success(function(response, body){
    console.log("successful list load");
    // console.log(response);
    // id, name, high_time, low_time, user_id
    $scope.listId = response.list.id;
    $scope.listName = response.list.name;
    $scope.highTime = response.list.high_time;
    $scope.lowTime = response.list.low_time;

    $scope.exercises = response.exercises;

  }).error(function() {
    console.log("failed to load the list");
  })

}]);