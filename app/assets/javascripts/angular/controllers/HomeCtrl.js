// HomeCtrl.js
myApp.controller('HomeCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

  $scope.showList = function(listId) {
    $location.path('/list').search({id: listId});
  }

  //Add scope variables
  $scope.greeting = "Hello Gov'na!";


  $http.get("http://localhost:3000/users/" + "1").success(function(response, body){
    console.log(response);
    $scope.userName = response.user.name;
    $scope.lists = response.lists;
  }).error(function() {
    console.log("Failed to load user data.");
  })

  // $http.get("http://localhost:3000/lists/" + "1").success(function(response, body){
  //   console.log("Successful List Retrieval");
  //   console.log(response);
  // })
  // .error(function(){
  //   console.log("List failed to load.");
  // });

}]);