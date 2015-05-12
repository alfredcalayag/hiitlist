// timer.js

window.onload = function() {
  console.log("Ok timer loaded!");

  var timer = document.getElementById("timer");
  // var start = document.getElementById("start");
  // var pause = document.getElementById("pause");
  // var resume = document.getElementById("resume");
  var id;
  var value = "00:00";
  timer.innerHTML = value;

  // Grab the list of exercises from the page
  collection = document.getElementsByClassName('exercise');

  $('#current_exercise').text("READY TO WORK?");

  var exArray = ['get ready...', 'jumps', 'rest', 'squats','rest','kicks', 'rest', 'punches'];
  var index = 0;

  beginWorkout = function(highTime) {

  var duration = highTime;

  function nextExercise() {
    index++;
    duration = highTime;  //
    if (index > exArray.length) {
      clearInterval(exerciseInterval);
      clearInterval(countdownInterval);
      timer.innerHTML = "00:00";
      $('#current_exercise').text("Workout Complete!");
      console.log("Exercise completed!");
      return;
    }
  }

  function secondPassed() {
      if (duration == highTime) {
        $('#current_exercise').text(exArray[index]);
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


}

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

  //   $('#current_exercise').text(description);

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