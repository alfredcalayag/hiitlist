// ListCtrl.js

myApp.controller('ListCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
  $scope.listId = $location.search().id;
  // console.log($location.search().id);

  //Add scope variables
  $scope.myList = "Workout List here";

  $http.get("http://localhost:3000/lists/" + $scope.listId).success(function(response, body){
    console.log("successful list load");
    console.log(response);
    // id, name, high_time, low_time, user_id
    $scope.listName = response.list.name;
    $scope.highTime = response.list.high_time;
    $scope.lowTime = response.list.low_time;

    $scope.exercises = response.exercises;

  }).error(function() {
    console.log("failed to load the list");
  })

}]);