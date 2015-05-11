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

  startTimer = function(m, s) {
      // console.log("Timer Started")
      timer.innerHTML = m + ":" + s;
      if (s == 0) {
          if (m == 0) {
              return;
          } else if (m != 0) {
              m = m - 1;
              s = 60;
          }
      }
      s = s - 1;
      id = setTimeout(function () {
          startTimer(m, s)
      }, 1000);

  }

  // startTimer(0, 30);

}