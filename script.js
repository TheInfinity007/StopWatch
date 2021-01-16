var startBtn = document.getElementById("start");
var lapBtn = document.getElementById("lap");
var min = document.getElementById("min");
var sec = document.getElementById("sec");
var msec = document.getElementById("msec");
var clock = document.getElementById("clock");
var content = document.getElementById("content");
var rows = document.getElementsByClassName("row");
var lapCount = 0;
var total = 0;
var intervalId;
var vMin = parseInt(min.innerText);
var vSec = parseInt(sec.innerText);
var vMsec = parseInt(msec.innerText);

startBtn.addEventListener('click', function(){

    if(startBtn.innerText == 'Start'){ 
        document.querySelector("#start div").innerText = "Stop";
        startBtn.classList.add("btn-danger");
        document.querySelector("#lap div").innerText = "Lap";

        intervalId = setInterval(function(){
            total += 10;
            vMsec = total%1000;
            vSec = Math.floor(total/1000)%60;
            vMin = Math.floor(total/60000);
            min.innerText = (vMin < 10) ? "0"+vMin : vMin;
            sec.innerText = (vSec < 10) ? "0" + vSec: vSec;
            msec.innerText = (vMsec > 99) ? vMsec.toString()[0] + vMsec.toString()[1] : "0"+vMsec.toString()[0];
        }, 10);
    }
    else{
        clearInterval(intervalId);
        document.querySelector("#start div").innerText = "Start";
        startBtn.classList.remove("btn-danger");
        document.querySelector("#lap div").innerText = "Reset";
    }
});

lapBtn.addEventListener('click', function(){
     if(lapBtn.innerText == 'Lap'){ 
        if(lapCount < 5){
            rows[lapCount].innerHTML = `<div class="label">Lap ${lapCount+1}</div><div class="time">${clock.innerText}</div>`;
        }else{
            content.innerHTML += `<div class="row"><div class="label">Lap ${lapCount+1}</div><div class="time">${clock.innerText}</div></div>`;
        }    
        lapCount++;
    }else{
        reset();
    }
});

function reset(){
    min.innerText = "00";
    sec.innerText = "00";
    msec.innerText = "00";
    total = 0;

    document.querySelector("#start div").innerText = "Start";
    startBtn.classList.remove("btn-danger");
    document.querySelector("#lap div").innerText = "Lap";
    lapCount = 0;
    let i;
    for(i = 0; i < Math.min(rows.length, 5); i++){
        rows[i].innerHTML = "";
    }
    for(i = rows.length-1; i >= 5; i--){
        content.removeChild(rows[i]);
    }
}
