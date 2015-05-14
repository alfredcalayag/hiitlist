// timer.js


var Instruction = function() {
  this.display = $("#instruction");
  this.display.html("Loading...");
  this.nextDisplay = $('#next-exercise');
}
Instruction.prototype = {
  updateDisplay: function(newInstruction) {
    this.display.html(newInstruction);
  },
  updateNextDisplay: function(exercise) {
    this.nextDisplay.html(exercise);
  }
}

var Playlist = function() {
  this.collection = [];
  this.trackList = [];
  this.index = 0;
}

Playlist.prototype = {
  load: function() {
    this.collection = $(".exercise");
    this.trackList.push("Get Ready...");

    // console.log(this.trackList);
    for(var i = 0; i < this.collection.length; i++) {
      this.trackList.push(this.collection[i].textContent);
      if (i < this.collection.length-1) {
        this.trackList.push("Rest");
      }
    }
  }
}

var Workout = function(userHighTime, userLowTime) {
  this.screen = $(".workout-screen");
  this.restColor = "#62600C";
  this.workColor = "slategrey";

  this.highTime = userHighTime;
  this.lowTime = userLowTime;
  this.loadingTime = 5;
  this.roundTime = this.loadingTime;
  this.duration = this.roundTime;

  // A workout consists of an Instruction object
  this.instruction = new Instruction();
}

Workout.prototype = {
  fullScreen: function() {
    this.screen.addClass("full-screen");
  },
  hideScreen: function() {
    this.screen.removeClass("full-screen");
  },
  changeScreenColor: function(color) {
    this.screen.css("background", color);
  }
  // start: function() {
  //   this.roundDuration = loadingTime;
  //   this.fullScreen();
  //   this.timer.reset();
  //   this.timer.start();
  // }
}

var Timer = function(myWorkout, myPlaylist) {
  this.display = $("#timer");
  this.countdownInterval;
  this.minutes;
  this.remainingSeconds;
  this.playlist = myPlaylist;
  this.workout = myWorkout;
  // this.playlist = new Playlist();
  // this.playlist.load());
  // console.log(this.playlist.trackList[this.playlist.index + 1]);
}

Timer.prototype = {
  reset: function() {
    this.display.html("00:00");
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
    this.display.html("0" + this.minutes + ":" + this.remainingSeconds);

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

  },

  nextExercise: function() {
    this.playlist.index++;  // Move to the next exercise
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
      gong.play();
      console.log("Workout Complete!");
      $('#start').addClass(".appear");
      $('#complete-btn').css("display","block");
      return;
    }
  },

  oneSecond: function() {
    // This is what happens at every 1 second interval
    console.log('one second passes');
    this.updateSeconds();
    this.updateDisplay();
    this.workout.duration--;

    if (this.workout.duration < 0) {
      if (this.playlist.index < this.playlist.trackList.length-1) {
        // Play the bell at the end of the exercise, but not at the last exercise
        bellSound.play();
      }
      this.nextExercise();
    }
  },

  start: function() {
    //start the clock
    // var workout = new Workout(20,10);
    console.log(this.playlist);
    this.workout.fullScreen();
    this.countdownInterval = setInterval(this.oneSecond.bind(this), 1000);
    console.log("starting the clock");
  }
}

// =====================

$(document).ready(function() {
  console.log("OO Time");

  // ====== Event Listeners & Buttons =========
  $('#start').click(function(e){
    e.preventDefault();
    var playlist = new Playlist();
    playlist.load();
    // TODO: Add user input here!
    var highTime = 5;
    var lowTime = 2;
    var workout = new Workout(highTime, lowTime);
    var timer = new Timer(workout, playlist);
    timer.reset();
    timer.start();
  });


  $('#complete-btn').click(function(e){
    e.preventDefault();
    $('.playlist').css("display", "block");
    $('.workout-screen').removeClass("full-screen");
    $('#instruction').text("Loading...");
    $('#timer').textContent = "00:00";
    $(this).css("display", "none");
  });


  $('#pause').click(function(e){
    e.preventDefault();
    console.log("pause");
  });

  $('#resume').click(function(e){
    e.preventDefault();
    console.log("resume");
  });


});
