let video = document.getElementById("Video");
let playBtn = document.getElementById("play-btn");
let scrubberSlider = document.getElementById("scrubber-slider")
let forward = document.getElementById("forward")
let backword = document.getElementById("backword")
let startBtn = document.getElementById("start")
let endBtn = document.getElementById("end")
let fullScreen = document.getElementById("full-screen");
let volumeSlider = document.getElementById("volume-slider");
let vloumIcon = document.getElementById("vloumIcon");
let vloumBtn = document.getElementById("volume")
let pauseIcon = document.getElementById("pauseIcon")
let playIcon = document.getElementById("playIcon")
let muteIcon = document.getElementById("muteIcon");
let muteBtn = document.getElementById("mute");
let muteWord = document.getElementById("muteWord")
let speedSlider = document.getElementById("speed-slider")
let speedIcon = document.getElementById("speedIcon")
let crntTime = document.getElementById("crntTime")
let fulltime = document.getElementById("fulltime")
let cuurentVolume;

/*when video loaded set max of slider to duration of video */
video.addEventListener("loadedmetadata", function () {
    scrubberSlider.max = Math.floor(video.duration);
    fulltime.textContent = formatTime(video.duration);
})

/*Play Button*/
playBtn.addEventListener("click", function () {

    if (video.paused)
        video.play(); //Async
    else
        video.pause();
})

video.addEventListener("play", function () {
    playIcon.classList.add("hide");
    playIcon.classList.remove("show");

    pauseIcon.classList.add("show");
    pauseIcon.classList.remove("hide");
});

video.addEventListener("pause", function () {
    playIcon.classList.add("show");
    playIcon.classList.remove("hide");

    pauseIcon.classList.add("hide");
    pauseIcon.classList.remove("show");
});

video.addEventListener("timeupdate", function () {
    scrubberSlider.value = Math.floor(video.currentTime);
    crntTime.textContent = formatTime(video.currentTime);
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

/*Update by 5 sec*/
forward.addEventListener("click", function () {
    video.currentTime += 5;
})
backword.addEventListener("click", function () {
    video.currentTime -= 5;
})
/* -------------------------------------------------*/
/*reset and end*/
startBtn.addEventListener("click", function () {
    console.log(video.currentTime);
    video.currentTime = 0;
    console.log(video.currentTime);
    scrubberSlider.value = video.duration;
})

endBtn.addEventListener("click", function () {
    scrubberSlider.value = video.duration;
    video.currentTime = video.duration;
})

/* -------------------------------------------------*/
scrubberSlider.addEventListener("input", function () {
    video.currentTime = this.value;

})
/*-------------------------------------------------*/
/*full Screen*/
fullScreen.addEventListener("click", function () {
    video.requestFullscreen();
})
/*-------------------------------------------------*/
/*Sound */
volumeSlider.addEventListener("input", function () {
    video.volume = this.value
})

/*-------------------------------------------------*/
//Vloum Icon //
vloumIcon.addEventListener("click", function () {
    vloumBtn.classList.toggle("hide")
})
/*-------------------------------------------------*/


muteBtn.addEventListener("click", function () {

    cuurentVolume = volumeSlider.value
    console.log(cuurentVolume);

    if (muteIcon.classList.contains("muted")) {
        volumeSlider.value = cuurentVolume
        muteIcon.classList.remove("muted");
        video.volume = cuurentVolume
        muteWord.classList.remove("muted")
    }

    else {
        video.volume = 0;
        muteIcon.classList.add("muted")
        muteWord.classList.add("muted")
    }
})

speedSlider.addEventListener("input", function () {
    video.playbackRate = this.value
})

speedIcon.addEventListener("click", function () {

    speedSlider.classList.toggle("hide")
})



