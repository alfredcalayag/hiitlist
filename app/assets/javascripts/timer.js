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



  beginWorkout = function(highTime) {
    var index = 0;
    // $('#instruction').text("READY TO WORK?");
    $(".workout-screen").addClass("full-screen");
    var duration = highTime;

    function nextExercise() {
      index++;
      duration = highTime;  //
      if (index > exArray.length-1) {
        clearInterval(exerciseInterval);
        clearInterval(countdownInterval);
        timer.innerHTML = "00:00";
        $('#instruction').text("Workout Complete!");
        console.log("Workout Complete!");
        // bellSound.play(); // FIXME: this is happening at every exercise!
        // bellSound.play();
        // bellSound.play();
        $('#start').addClass(".appear");
        $('#complete-btn').css("display","block");
        return;
      }
    }

    function secondPassed() {
        if (duration == highTime) {
          $('#instruction').text(exArray[index]);
          bellSound.play();

          if (index < exArray.length && index % 2 == 0) {
            $('.workout-screen').css("background", "#62600C");
            $('#next-exercise').text("(Next Exercise: " + exArray[index+1] + ")" );
          } else {
            $('.workout-screen').css("background", "slategrey");
            $('#next-exercise').text(" ");
          }
          console.log("BUZZER NOISE");
        }

        var minutes = Math.round((duration - 30)/60);
        var remainingSeconds = duration % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }
        timer.innerHTML = "0" + minutes + ":" + remainingSeconds;
        duration--;
    }

  var countdownInterval = setInterval(secondPassed, 1000); // 1 second
  var exerciseInterval = setInterval(nextExercise, duration*1000 + 600);

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
    $('.playlist').css("display", "none");
    $('.workout-screen').removeClass("full-screen");
    $('#instruction').text("Loading...");
    $('.playlist').css("display", "block");
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