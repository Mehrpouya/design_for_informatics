var g_sec=0,g_min=0,g_miliSec=0;
var g_trialStarted=false;
var g_intervalID;

$(document).ready(function() {
  restartTrial();
  $("#trialButton").bind("click",startStopTrial);
});

function startStopTrial(){
  if(!g_trialStarted){
    startTrial();
  }
  else {
    stopTrial();

  }
}
function restartTrial(){
  $("#trialButton").show();
  g_trialStarted=false;
  g_sec=0,g_min=0,g_miliSec=0;
  $("#trialButton").removeClass("colorRed").addClass("colorLightBlue").val('Feedback time!');
  $("#status").html("Begin Test").removeClass("colorTextRed colorTextGreen").addClass("colorTextLightBlue");
  $("#counter").removeClass("colorTextRed colorTextGreen").addClass("colorTextLightBlue").text("00:00:00");
}
function startTrial(){
  g_intervalID=setInterval(updateTimer, 1);
  g_trialStarted=true;
  $("#trialButton").removeClass("colorLightBlue").addClass("colorRed").val('Stop');
  $("#status").html("Test in<br>Progress").removeClass("colorTextLightBlue colorTextGreen").addClass("colorTextRed");
  $("#counter").removeClass("colorTextGreen colorTextLightBlue").addClass("colorTextRed");
}

function stopTrial(){
  window.clearInterval(g_intervalID);
  $("#trialButton").removeClass("colorRed").addClass("colorLightBlue").hide().val("start");
  $("#status").html("Test<br>Complete").removeClass("colorTextLightBlue colorTextRed").addClass("colorTextGreen");;
  $("#trialSave").show();
  $("#trialRestart").show();
  $("#counter").removeClass("colorTextGreen colorTextRed").addClass("colorTextLightBlue");
}
function saveTrial(){

}


function updateTimer(){
  g_miliSec+=1;
  if(g_miliSec>=60){
    g_miliSec=0;
    g_sec+=1;
  }
  if(g_sec>=60){
    g_min+=1;
    g_sec=0;
    stopTrial();
  }
  var mili = normalizeNum(g_miliSec);
  var sec = normalizeNum(g_sec)
  var min = normalizeNum(g_min)
  $("#counter").text(min + " : " + sec + " : " + mili);
  if (g_min===10)window.clearInterval(g_intervalID);
}
function normalizeNum(n){
  if(n>=60)
  n=0;
  return n > 9 ? "" + n: "0" + n;
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
