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

    for(var i = 0; i < this.collection.length; i++){
      // function(i) {
        // console.log(i);
        this.trackList.push(this.collection[i].html);
      // };
    }
    this.trackList.push("Rest");
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

var Timer = function(myWorkout) {
  this.display = $("#timer");
  this.countdownInterval;
  this.minutes;
  this.remainingSeconds;

  this.workout = myWorkout;
  this.playlist = new Playlist();
  this.playlist.load();
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

    // console.log(this.workout.duration);
    // console.log(this.workout.roundTime);
    console.log(this.playlist.index);
    console.log(this.workout.duration);

    if (this.playlist.index % 2 == 0) {
      this.workout.roundTime = this.workout.lowTime - 1;
      this.workout.duration = this.workout.lowTime - 1;
    }
    else {
      this.workout.roundTime = this.workout.highTime - 1;
      this.workout.duration = this.workout.highTime - 1;
    }
    console.log(this.workout.duration);

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

  // ====== Buttons =========
  $('#start').click(function(e){
    e.preventDefault();
    // $(this).addClass(".hide");
    // $('.playlist').css("display", "none");
    // beginWorkout(20); // TODO: Allow user input.  For now, manual assignment for demo purposes.
    var workout = new Workout(20, 10);
    var timer = new Timer(workout);
    timer.start();
  });

  $('#pause').click(function(e){
    e.preventDefault();
    console.log("pause");
  });

  $('#resume').click(function(e){
    e.preventDefault();
    console.log("resume");
  });

  $('#complete-btn').click(function(e){
    e.preventDefault();
    console.log('Quack');
    $('.playlist').css("display", "block");
    $('.workout-screen').removeClass("full-screen");
    $instruction.text("Loading...");
    timerDigits.innerHTML = "00:00";
    $(this).css("display", "none");
  });


// =======================

  // var myTimer = new Timer();
  // var myPlaylist = new Playlist();

  // Build exercise playlist
  // $collection = $('.exercise');
  // exArray = ['Get Ready...'];
  // populateArray();

  // function populateArray(){
  //   for(i = 0; i < $collection.length; i++){
  //     exArray.push($collection[i].innerHTML);
  //     if (i < $collection.length-1) {
  //       exArray.push("Rest");
  //     }
  //   }
  // }

  beginWorkout = function(highTime, lowTime) {
  // TODO: Allow user input of lowTime
    // var index = 0;
    // $(".workout-screen").addClass("full-screen");
    // var duration = 8;
    // var lowTime = 5;
    // var roundTime = 8;

    function nextExercise() {
      index++;

      // Reset the timer to the round duration.  Either Rest or High Intensity
      if (index % 2 == 0) {  // rest round
        roundTime = lowTime - 1;
        duration = lowTime - 1;
      }
      else {
        roundTime = highTime - 1; // high-intensity round
        duration = highTime - 1;
      }

      // If last exercise completed, finish the workout!
      if (index > exArray.length-1) {
        clearInterval(countdownInterval);
        $instruction.text("Workout Complete!");
        console.log("Workout Complete!");
        gong.play();
        $('#start').addClass(".appear");
        $('#complete-btn').css("display","block");
        return;
      }
    }

    function secondPassed() {
        var minutes = Math.round((duration - 30)/60);
        var remainingSeconds = duration % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }

        timerDigits.innerHTML = "0" + minutes + ":" + remainingSeconds;

        // start of a new round, i.e. when we reset the duration above
        if (duration == roundTime && index < exArray.length) {
          $instruction.text(exArray[index]);

          if (index < exArray.length && index % 2 == 0) { // Rest round
            $('.workout-screen').css("background", "#62600C");
            $('#next-exercise').text("(Next Exercise: " + exArray[index+1] + ")" );
          } else {  // High-intensity round
            $('.workout-screen').css("background", "slategrey");
            $('#next-exercise').text(" ");
          }
        }

        duration--;

        if (duration < 0) {
          if (index < exArray.length-1) { bellSound.play(); }
          nextExercise();
        }
    }

    var countdownInterval = setInterval(secondPassed, 1000); // 1 second
  }


});
