$(document).ready(function(){
  console.log("Bell Loaded");
  bellSound = document.getElementById('bell');
  gong = document.getElementById('gong');

  bellSound.play();
  bellSound.pause();
  gong.play();
  gong.pause();
});