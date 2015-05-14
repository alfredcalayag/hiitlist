// timer.js


var Timer = function() {
  this.display = $("#timer");
}

Timer.prototype = {
  reset: function() {
    this.display.html("00:00");
  }
}

var Instruction = function() {
  this.display = $("#instruction");
}
Instruction.prototype = {
  updateDisplay: function(newInstruction) {
    this.display.html(newInstruction);
  }
}

var Playlist = function() {
  this.collection = [];
  this.trackList = [];
}

Playlist.prototype = {
  load: function() {
    this.collection = $(".exercise");
    this.trackList.push("Get Ready...");
    for(i = 0; i < this.collection.length; i++){
      this.trackList.push(this.collection[i].html);
      if (i < this.collection.length-1) {
        this.trackList.push("Rest");
      }
    };
  }
}

var Workout = function(userHighTime, userLowTime) {
  this.display = $(".workout-screen");
  this.highTime = userHighTime;
  this.lowTime = userLowTime;
  this.loadingTime = 8;
}

Workout.prototype = {
  fullScreen: function() {
    this.display.addClass("full-screen");
  },
  hideScreen: function() {
    this.display.removeClass("full-screen");
  },
  start: function() {
    this.roundDuration = loadingTime;
    this.fullScreen();
  }
}


// =====================

$(document).ready(function() {
  console.log("OO Time");
  var myTimer = new Timer();
  var myPlaylist = new Playlist();

  myTimer.reset();
  myPlaylist.load();

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
    var index = 0;
    $(".workout-screen").addClass("full-screen");
    var duration = 8;
    var lowTime = 5;
    var roundTime = 8;

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



  // ====== Buttons =========
  $('#start').click(function(e){
    e.preventDefault();
    console.log("begin button loaded");
    $(this).addClass(".hide");
    $('.playlist').css("display", "none");
    beginWorkout(20); // TODO: Allow user input.  For now, manual assignment for demo purposes.
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

});
