// timer.js

$(document).ready(function() {
  console.log("Timer loaded");
  // console.log("Audio loaded");
  // bellSound = document.getElementById('bell');

  var timer = document.getElementById("timer");
  // var start = document.getElementById("start");
  // var pause = document.getElementById("pause");
  // var resume = document.getElementById("resume");
  var id;
  var value = "00:00";
  timer.innerHTML = value;

  // Grab the list of exercises from the page
  collection = $('.exercise');

  // Build exercise playlist
  exArray = ['Get Ready...'];
  populateArray();

  function populateArray(){
    for(i = 0; i < collection.length; i++){
      exArray.push(collection[i].innerHTML);
      if (i < collection.length-1) {
        exArray.push("Rest");
      }
    }
  };



  beginWorkout = function(highTime) { // TODO: Object Orient it!
    var index = 0;
    // $('#instruction').text("READY TO WORK?");
    $(".workout-screen").addClass("full-screen");
    var duration = 8;
    var lowTime = 5;
    var roundTime = 8;

    function nextExercise() {
      index++;

      // Reset the timer to the round duration.  Either Rest or High Intensity
      if (index % 2 == 0) {  // rest round
        roundTime = lowTime;
        duration = lowTime;
      }
      else {
        roundTime = highTime; // high-intensity round
        duration = highTime;
      }

      // If last exercise completed, finish the workout!
      if (index > exArray.length-1) {
        clearInterval(countdownInterval);
        $('#instruction').text("Workout Complete!");
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

        timer.innerHTML = "0" + minutes + ":" + remainingSeconds;

        // start of a new round, i.e. when we reset the duration above
        if (duration == roundTime && index < exArray.length) {
          $('#instruction').text(exArray[index]);

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
    beginWorkout(10); // TODO: Allow user input.  For now, manual assignment for demo purposes.
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
    $('#instruction').text("Loading...");
    timer.innerHTML = "00:00";
    $(this).css("display", "none");

  });


});

// ========= REFERENCE SECTION ============

// Deprecated timer example.  For reference only.
// newTimer = function(duration) {

//   secondPassed = function() {
//       var minutes = Math.round((duration - 30)/60);
//       var remainingSeconds = duration % 60;
//       if (remainingSeconds < 10) {
//           remainingSeconds = "0" + remainingSeconds;
//       }
//       timer.innerHTML = "0" + minutes + ":" + remainingSeconds;
//       if (duration <= 0) {
//           clearInterval(countdownInterval);
//           console.log("Time complete!");
//           return;
//       } else {
//           duration--;
//       }
//   }
//   var countdownInterval = setInterval(secondPassed, 1000);

// }


// Deprecated promise function example.  For reference only.
  // var one = function(description, seconds){
  //   var deferred = $.Deferred();
  //   var timeBuffer = seconds * 1000 + 1500;
  //   newTimer(seconds);

  //   $('#instruction').text(description);

  //   setTimeout(function(){
  //     console.log('one');
  //     deferred.resolve();
  //   }, timeBuffer); //allows newTimer to complete

  //     return deferred.promise();
  // }

  // begin = function(){
  //   // three().then(three);
  //   one("First exercise", 5).then(one("Second exercise", 9));
  // }
