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
      })
      .then(function(){
          // Start the clock
          $scope.myTimer = new $scope.Timer($scope.myWorkout, $scope.myList);
          $scope.myTimer.start();
      });

// Display Area of the current/next exercise
    $scope.Instruction = function() {}
    $scope.Instruction.prototype = {
      updateDisplay: function(newInstruction) {
        $scope.display = newInstruction;
        $scope.$apply();
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

    this.highTime = 3;
    this.lowTime = 3;
    this.loadingTime = 3;
    this.roundTime = this.loadingTime;
    this.duration = this.roundTime;

    // A workout consists of an Instruction object
    this.instruction = new $scope.Instruction();
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

$scope.Timer = function(myWorkout, myPlaylist) {
  // this.display = $scope.clock;
  this.countdownInterval;
  this.minutes;
  this.remainingSeconds;
  this.playlist = myPlaylist;
  this.workout = myWorkout;
  this.bellSound = new Audio('./audios/bell.mp3');
  this.gong = new Audio('./audios/gong.mp3');
}

$scope.Timer.prototype = {
  reset: function() {
    $scope.clock = "00:00";
  },

  updateSeconds: function() {
    this.remainingSeconds = this.workout.duration % 60;
    if (this.remainingSeconds < 10) {
      this.remainingSeconds = "0" + this.remainingSeconds;
    }
    this.minutes = Math.round((this.workout.duration - 30)/60);
    this.remainingSeconds = this.workout.duration % 60;
    if (this.remainingSeconds < 10) {
      this.remainingSeconds = "0" + this.remainingSeconds;
    }
  },

  updateDisplay: function() {
    $scope.clock = "0" + this.minutes + ":" + this.remainingSeconds;

    if (this.workout.duration == this.workout.roundTime && this.playlist.index < this.playlist.trackList.length) {
        this.workout.instruction.updateDisplay(this.playlist.trackList[this.playlist.index]);
      if (this.playlist.index < this.playlist.trackList.length && this.playlist.index % 2 == 0) {
        this.workout.changeScreenColor(this.workout.restColor);
        this.workout.instruction.updateNextDisplay("(Next Exercise: "
          + this.playlist.trackList[this.playlist.index + 1]
          + ")" );
      }
      else {
        this.workout.changeScreenColor(this.workout.workColor);
        this.workout.instruction.updateNextDisplay(" ");
      }
    }
    $scope.$apply();
  },

  nextExercise: function() {
    this.playlist.index++;
    // Move to the next exercise
    // Resets the timer to the round duration.
    // Rest rounds are at even indexes.
    // High Intensity are at odd indexes.

    if (this.playlist.index % 2 == 0) {
      this.workout.roundTime = this.workout.lowTime - 1;
      this.workout.duration = this.workout.lowTime - 1;
    }
    else {
      this.workout.roundTime = this.workout.highTime - 1;
      this.workout.duration = this.workout.highTime - 1;
    }

    // If last exercise completed, finish the workout!
    if (this.playlist.index > this.playlist.trackList.length - 1) {
      clearInterval(this.countdownInterval);
      this.workout.instruction.updateDisplay("Workout Complete!");
      // $scope.display = "Workout Complete!";
      this.gong.play();
      console.log("Workout Complete!");
      $('#start').addClass(".appear");
      $('#complete-btn').css("display","block");
      return;
    }
  },

  oneSecond: function() {
    // This is what happens at every 1 second interval
    this.updateSeconds();
    this.updateDisplay();
    this.workout.duration--;

    if (this.workout.duration < 0) {
      if (this.playlist.index < this.playlist.trackList.length-1) {
        // Play the bell at the end of the exercise, but not at the last exercise
        this.bellSound.play();
      }
      this.nextExercise();
    }
  },

  start: function() {
    //start the clock
    this.countdownInterval = setInterval(this.oneSecond.bind(this), 1000);
    console.log("starting the clock");
  }
}


}]);

