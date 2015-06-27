// WorkoutCtrl.js

myApp.controller('WorkoutCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    $scope.listId = $location.search().id;
    $scope.clock = "00:00";
    $scope.display = "Get Ready...";
    $scope.nextDisplay = "";


    $http.get("../lists/" + $scope.listId)
      .success
        // Get data
        (function(response, body) {
          $scope.listId = response.list.id;
          $scope.listName = response.list.name;
          $scope.highTime = response.list.high_time;
          $scope.lowTime = response.list.low_time;
          $scope.exercises = response.exercises;
        })
      .error(function(){
        console.log("Failed to load exercise list");
      })
      .then(function(){
          // Initialize Playlist
          $scope.myList = new $scope.Playlist;
          $scope.myList.load();

          // Initialize Workout
          $scope.myWorkout = new $scope.Workout($scope.highTime, $scope.lowTime);
      });

// Display Area of the current/next exercise
    $scope.Display = function() {}
    $scope.Display.prototype = {
      updateDisplay: function(newInstruction) {
        $scope.display = newInstruction;
      },
      updateNextDisplay: function(nextInstruction) {
        $scope.nextDisplay = nextInstruction;
      }
    }


// Initialize the exercise playlist
  $scope.Playlist = function() {
    this.collection = [];
    this.trackList = [];
    this.index = 0;
  }

// Adds padding to beginning and end and rests in between
  $scope.Playlist.prototype = {
    load: function() {
      this.collection = $scope.exercises;
      this.trackList.push("Get Ready...");
      for(var i = 0; i < this.collection.length; i++) {
          this.trackList.push(this.collection[i].name);
          if (i < this.collection.length-1) {
            this.trackList.push("Rest");
          }
        }
      }
    }

// Initialize Workout screen and timers
  $scope.Workout = function(userHighTime, userLowTime) {
    this.screen = $(".workout-screen");
    this.restColor = "#62600C";
    this.workColor = "slategrey";

    this.highTime = $scope.highTime;
    this.lowTime = $scope.lowTime;
    this.loadingTime = 5;
    this.roundTime = this.loadingTime;
    this.duration = this.roundTime;

    // A workout consists of an Instruction object
    this.display = new $scope.Display();
  }

  $scope.Workout.prototype = {
    fullScreen: function() {
      this.screen.addClass("full-screen");
    },
    hideScreen: function() {
      this.screen.removeClass("full-screen");
    },
    changeScreenColor: function(color) {
      this.screen.css("background", color);
    }
  }

}]);

