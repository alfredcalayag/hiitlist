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


function newTimer(seconds) {
  clearInterval(countdownTimer);
  // var seconds = 10;
  secondPassed = function() {
      var minutes = Math.round((seconds - 30)/60);
      var remainingSeconds = seconds % 60;
      if (remainingSeconds < 10) {
          remainingSeconds = "0" + remainingSeconds;
      }
      timer.innerHTML = "0" + minutes + ":" + remainingSeconds;
      if (seconds == 0) {
          clearInterval(countdownTimer);
          console.log("Time complete!");
          // deferred.resolve();
          return;
      } else {
          seconds--;
      }
  }

  var countdownTimer = setInterval('secondPassed()', 1000);
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




  // function startTimer(m, s) {
  //     timer.innerHTML = m + ":" + s;
  //     if (s == 0 && m == 0) {
  //       // Done.
  //       console.log("Time's Up!");
  //       return;
  //     }
  //     else if (s == 0) {
  //         if (m == 0) {
  //             return;
  //         } else if (m != 0) {
  //             m = m - 1;
  //             s = 60;
  //         }
  //     }
  //     s = s - 1;
  //     id = setTimeout(function() {
  //         startTimer(m, s)
  //     }, 1000);
  // }


  // function three(){
  //   var deferred = $.Deferred();

  //   setTimeout(function(){
  //     console.log('three');
  //     $('#current_exercise').text(collection[2].innerHTML);
  //     deferred.resolve();
  //   }, 6000);

  //   return deferred.promise();
  // }

  // one().then(two).then(three).then(two);

  begin = function(){
    // three().then(three);
    one("First exercise", 5).then(one("Second exercise", 9));
  }

}