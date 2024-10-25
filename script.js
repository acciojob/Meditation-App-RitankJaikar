const videoElement = document.querySelector(".meditation-video");
const audioElement = document.querySelector(".meditation-audio");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const app = document.querySelector(".app");

let duration = 600; // default 10 minutes
let isPlaying = false;
let timer;

const setTimer = (seconds) => {
    let remainingTime = seconds;
    clearInterval(timer);

    timer = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (remainingTime <= 0) {
            clearInterval(timer);
            videoElement.pause();
            audioElement.pause();
            playButton.textContent = "Play";
            isPlaying = false;
        }

        remainingTime--;
    }, 1000);
};

const togglePlay = () => {
    if (isPlaying) {
        videoElement.pause();
        audioElement.pause();
        clearInterval(timer);
        playButton.textContent = "Play";
    } else {
        videoElement.play();
        audioElement.play();
        setTimer(duration);
        playButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
};

// Set up event listeners for time selection
document.getElementById("smaller-mins").addEventListener("click", () => {
    duration = 120;
    timeDisplay.textContent = "2:0";
    clearInterval(timer);
});

document.getElementById("medium-mins").addEventListener("click", () => {
    duration = 300;
    timeDisplay.textContent = "5:0";
    clearInterval(timer);
});

document.getElementById("long-mins").addEventListener("click", () => {
    duration = 600;
    timeDisplay.textContent = "10:0";
    clearInterval(timer);
});

// Sound switch functionality
document.getElementById("beach-btn").addEventListener("click", () => {
    clearInterval(timer);
    togglePlay()
    videoElement.src = "video/beach.mp4";
    audioElement.src = "sounds/beach.mp3";
});

document.getElementById("rain-btn").addEventListener("click", () => {
    clearInterval(timer);
    togglePlay()
    
    videoElement.src = "video/rain.mp4";
    audioElement.src = "sounds/rain.mp3";
});

// Play/Pause button
playButton.addEventListener("click", togglePlay);