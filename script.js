/*
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
*/















//your JS code here. If required.
const app = document.getElementById('app');
const videoContainer = document.querySelector('.vid-container');
const video = document.getElementById('video');
const audio = document.getElementById('audio');
const soundButtons = document.querySelectorAll('.sound-picker button');
const timeButtons = document.querySelectorAll('.time-select button');
const timeDisplay = document.querySelector('.time-display');
const playButton = document.querySelector('.play');

let currentTime = 10 * 60; // 10 minutes in seconds
let isPlaying = false;

function updateTimer() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(duration) {
  currentTime = duration * 60;
  updateTimer();

  const timer = setInterval(() => {
    currentTime--;
    updateTimer();

    if (currentTime <= 0) {
      clearInterval(timer);
      pauseMeditation();
    }
  }, 1000);
}

function pauseMeditation() {
  isPlaying = false;
  video.pause();
  audio.pause();
  playButton.textContent = 'Play';
}

function playMeditation() {
  isPlaying = true;
  video.play();
  audio.play();
  playButton.textContent = 'Pause';
}

soundButtons.forEach(button => {
	button.addEventListener('click', () => {
	    const soundFile = button.id === 'sound1' ? 'beach.mp3' : 'rain.mp3';
	    audio.src = `sounds/${soundFile}`;
		  audio.play();
	
		// Update the active button styling
		soundButtons.forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
	});
});

timeButtons.forEach(button => {
	button.addEventListener('click', () => {
		const time = button.id === 'smaller-mins' ? 2 : button.id === 'medium-mins' ? 5 : 10;
		startTimer(time);
		// Update the active button styling
		timeButtons.forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
	});
});

playButton.addEventListener('click', () => {
	if (isPlaying) {
		pauseMeditation();
	} else {
		playMeditation();
	}
});







