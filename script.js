
//"beach", "rain"
let selectedMode= "rain";
//"not-started" , "paused" , "playing" 
let playStatus= "not-started";

let timer= null;    //setInterval Function
//10, 5, 2
let startTime= 10;  //default time in minute
let elapsedTime= startTime*60*1000;

const rainVideo = document.querySelector("#rain-video");
const beachVideo = document.querySelector("#beach-video");
const rainAudio =  document.querySelector("#rain-audio");
const beachAudio =  document.querySelector("#beach-audio");
const rainDiv = document.querySelector("#rain-div");
const beachDiv = document.querySelector("#beach-div");
const circularProgress = document.querySelector(".circular-progress");  // Circular progress element
const circularProgressCircle = document.querySelector(".circular-progress circle.fg");

circularProgressCircle.style.display= "none";

rainVideo.play();
beachVideo.play();

rainVideo.loop= true;
beachVideo.loop= true;
rainAudio.loop= true;
beachAudio.loop= true;

rainDiv.addEventListener("click", e => {
    rainVideo.classList.remove("video-display-none");
    beachVideo.classList.add("video-display-none");
    selectedMode= "rain";

    if(playStatus === "playing") {
        rainAudio.play();
        beachAudio.pause();
    }

    rainVideo.play();
    beachVideo.play();
})

beachDiv.addEventListener("click", e => {
    rainVideo.classList.add("video-display-none");
    beachVideo.classList.remove("video-display-none");
    selectedMode= "beach";

    if(playStatus === "playing") {
        beachAudio.play();
        rainAudio.pause();
    }

    rainVideo.play();
    beachVideo.play();
})

const smallerMins = document.querySelector("#smaller-mins");
const mediumMins = document.querySelector("#medium-mins");
const longMins = document.querySelector("#long-mins");
const timeDisplay = document.querySelector(".time-display");
const reset= document.querySelector(".reset");
const play= document.querySelector(".play span");

smallerMins.addEventListener("click", () => {
    timeDisplay.innerHTML= "02:00";
    startTime= 2;
    elapsedTime= startTime*60*1000;
    playStatus= "not-started";
    reset.click();

    rainVideo.play();
    beachVideo.play();
});

mediumMins.addEventListener("click", () => {
    timeDisplay.innerHTML= "05:00";
    startTime= 5;
    elapsedTime= startTime*60*1000;
    playStatus= "not-started";
    reset.click();

    rainVideo.play();
    beachVideo.play();
});

longMins.addEventListener("click", () => {
    timeDisplay.innerHTML= "10:00";
    startTime= 10;
    elapsedTime= startTime*60*1000;
    playStatus= "not-started";
    reset.click();

    rainVideo.play();
    beachVideo.play();
});

play.addEventListener("click", () => {
    circularProgressCircle.style.display= "block";
    if(playStatus==="not-started" || playStatus==="paused") {
        play.textContent = "❚ ❚";
        playStatus="playing";
        selectedMode === "rain" && rainAudio.play();
        selectedMode === "beach" && beachAudio.play();
        timer = setInterval(update, 1000);
    }
    else if(playStatus==="playing") {
        play.textContent = "►";
        playStatus="paused";
        rainAudio.pause();
        beachAudio.pause();
        clearInterval(timer);
    }

    rainVideo.play();
    beachVideo.play();
})

reset.addEventListener("click", () => {
    playStatus= "not-started";
    play.textContent = "►";
    rainAudio.pause();
    beachAudio.pause();

    clearInterval(timer);
    elapsedTime= startTime*60*1000;
    circularProgress.style.setProperty('--progress', 0);

    if(startTime === 10) {
        timeDisplay.innerHTML= "10:00";
    }
    else if(startTime === 5) {
        timeDisplay.innerHTML= "05:00";
    }
    else if(startTime === 2) {
        timeDisplay.innerHTML= "02:00";
    }

    circularProgressCircle.style.display= "none";

    rainVideo.play();
    beachVideo.play();
})

function update() {
    elapsedTime= elapsedTime- 1000;

    let mins= String(Math.floor(elapsedTime / (1000 * 60) %60));
    let secs= String(Math.floor(elapsedTime / 1000 % 60));

    mins = mins.length<=1 ? "0"+mins : mins;
    secs = secs.length<=1 ? "0"+secs: secs;

    timeDisplay.innerHTML= mins + ":" + secs;

    // Calculate progress and update the circular progress bar
    let progressPercentage = ((startTime * 60 * 1000 - elapsedTime) / (startTime * 60 * 1000)) * 100;
    circularProgress.style.setProperty('--progress', progressPercentage);

    if(elapsedTime === 0 ) {
        clearInterval(timer);
        reset.click();
    }
}