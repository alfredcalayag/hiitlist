// WorkoutCtrl.js

myApp.controller('WorkoutCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.clock = "00:00";
    $scope.instruction = "Get Ready...";
    $scope.nextInstruction = "";
}]);

