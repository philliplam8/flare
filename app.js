// Audio File
var flareSound = new Audio("FlareSound.mp3");

// DOM Object
const glow = document.getElementsByClassName("glowtwo")[0];
const flame = document.getElementsByClassName("flame")[0];

// Mobile Detection Variables
var initialX;
var initialY;

// Flame UI

function toggleFlame() {
    const flareStatus = glow.style.visibility;

    if (flareStatus == "visible") {
        flame.style.visibility = "hidden";
        glow.style.visibility = "hidden";
    } else {
        flame.style.visibility = "visible";
        glow.style.visibility = "visible";
    }
}

function flicker() {
    setTimeout(function () {
        toggleFlame();
        flicker();
    }, Math.random() * 100);
}

// only works if the user taps the screenfirst then swipes
function playAudio() {
    var audio = document.getElementById("audio");
    audio.play();
}

// Mobile Detection

function touchStart(event) {
    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
}

function touchMove(event) {
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;

    var xDist = Math.abs(x - initialX);
    var yDist = Math.abs(y - initialY);

    if (xDist > yDist) { // Horizontal Swipe
        console.log("Playing...");
        playAudio();
        setTimeout(function () {
            flicker();
        }, 1000);
    }
}

document.addEventListener('touchstart', touchStart, false);
document.addEventListener('touchmove', touchMove, false);

// TODO
//  Need to add a flare cap and tell the user to click to remove
// Then swipe and strike