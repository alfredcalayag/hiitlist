// SignInCtrl.js

myApp.controller('SignInCtrl', ['$scope', '$http', '$state', '$cookies', function($scope, $http, $state, $cookies) {

  if ($cookies.currentUserId && $cookies.currentUserId !== "signed out") {
    console.log($cookies.currentUserId);
    $state.go('home');
  }


  $scope.signIn = function(userEmail) {
    $http.post("../sessions", {email: mail})
      .success(function(response, body){
        console.log("Successful Session!");
        console.log(response);
        $cookies.currentUserId = response.current_user_id.toString();
        console.log($cookies.currentUserId);
        $state.go('home', {userId: $cookies.currentUserId});
      })
      .error(function(){
        console.log("Error in attempt to log in.");
      });
  }

}]);