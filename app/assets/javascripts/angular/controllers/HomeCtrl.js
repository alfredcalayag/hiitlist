// HomeCtrl.js
myApp.controller('HomeCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

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