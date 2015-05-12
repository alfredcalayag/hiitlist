// timer.js

window.onload = function() {
  console.log("Ok timer loaded!");

  var timer = document.getElementById("timer");
  // var start = document.getElementById("start");
  // var pause = document.getElementById("pause");
  // var resume = document.getElementById("resume");
  var id;
  var value = "00:00";

  // Initialize the timer value
  timer.innerHTML = value;

  // Grab the list of exercises from the page
  collection = document.getElementsByClassName('exercise');

  $('#current_exercise').text("READY TO WORK?");


newTimer = function(duration) {

  secondPassed = function() {
      var minutes = Math.round((duration - 30)/60);
      var remainingSeconds = duration % 60;
      if (remainingSeconds < 10) {
          remainingSeconds = "0" + remainingSeconds;
      }
      timer.innerHTML = "0" + minutes + ":" + remainingSeconds;
      if (duration <= 0) {
          clearInterval(countdownInterval);
          console.log("Time complete!");
          return;
      } else {
          duration--;
      }
  }
  var countdownInterval = setInterval(secondPassed, 1000);

}


  var one = function(description, seconds){
    var deferred = $.Deferred();
    var timeBuffer = seconds * 1000 + 1500;
    newTimer(seconds);

    $('#current_exercise').text(description);

    setTimeout(function(){
      console.log('one');
      deferred.resolve();
    }, timeBuffer); //allows newTimer to complete

      return deferred.promise();
  }


  // var deferreds = [];
  // for (var i = 0; i < collection.length; i++){
  //   return function(){
  //     deferreds.push(one);
  //   }
  // }


  begin = function(){
    // three().then(three);
    one("First exercise", 5).then(one("Second exercise", 9));
  }

var exArray = ['jumps','squats', 'kicks', 'punches'];
var index = 0;

beginWorkout = function() {
  $('#current_exercise').text("Get Ready..");

  var duration = 5;

  function nextExercise() {
    $('#current_exercise').text(exArray[index]);
    index++;
    // newTimer(5);
    duration = 5;
    if (index > exArray.length) {
      clearInterval(exerciseInterval);
      clearInterval(countdownInterval);
      console.log("Exercise completed!");
      return;
    }
  }

  secondPassed = function() {
      var minutes = Math.round((duration - 30)/60);
      var remainingSeconds = duration % 60;
      if (remainingSeconds < 10) {
          remainingSeconds = "0" + remainingSeconds;
      }
      timer.innerHTML = "0" + minutes + ":" + remainingSeconds;
      // if (duration < 0) {
      //     clearInterval(countdownInterval);
      //     console.log("Exercise completed!");
      //     return;
      // } else {
          duration--;
      // }
  }
  var countdownInterval = setInterval(secondPassed, 1000);
  var exerciseInterval = setInterval(nextExercise, 5500);


}

}