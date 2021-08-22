// CONSTANTS AND VARIABLES ----------------------------------------------------

// Audio File
var capSound = new Audio("UncapSound.mp3");
var flareSound = new Audio("FlareSound.mp3");

// DOM Object
const instructions = document.getElementsByClassName("instructions")[0];
const cap = document.getElementsByClassName("cap")[0];
const glow = document.getElementsByClassName("glowtwo")[0];
const flame = document.getElementsByClassName("flame")[0];
const flare = document.getElementById("flare");
const body = document.getElementsByTagName("body")[0];


// Constants
const SWIPE_THRESHOLD = 200;
const FLARE_MAX_DURATION = 100; // milliseconds
const INSTRUCTIONS_CAP = "CLICK TO REMOVE CAP";
const INSTRUCTIONS_FLARE = "SWIPE FLARE TO START";
var capOn = true;

// Mobile Detection Variables
var initialX;
var initialY;

// FUNCTIONS ------------------------------------------------------------------

// Instructions
function changeInstructions() {
    instructions.innerText = INSTRUCTIONS_FLARE;
}

// Flare Cap
function removeCap() {
    cap.style.visibility = "hidden";
    if (capOn) {
        capSound.play();
        capOn = false;
    }
}

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
    }, Math.random() * FLARE_MAX_DURATION);
}

function playAudio() {
    flareSound.play(); // only works if user taps the screen first then swipes
}


// WRAPPER FUNCTIONS ----------------------------------------------------------

function prepareFlare() {
    removeCap();
    changeInstructions();
}

function useFlare() {
    console.log("Playing...");
    playAudio();
    setTimeout(function () {
        flicker();
    }, 1000);
}

// Mobile Detection -----------------------------------------------------------

function touchStart(event) {
    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
    prepareFlare();
}

function touchMove(event) {
    var x = event.touches[0].clientX;
    var y = event.touches[0].clientY;

    var xDist = Math.abs(x - initialX);
    var yDist = Math.abs(y - initialY);

    if (xDist > yDist && xDist > SWIPE_THRESHOLD) { // Horizontal Swipe
        useFlare();
    }
}

document.addEventListener("touchstart", touchStart, false);
document.addEventListener("touchmove", touchMove, false);

// Desktop Detection ----------------------------------------------------------

function desktopTouchMove(event) {
    useFlare();
}

document.addEventListener("click", prepareFlare);
flare.addEventListener("click", desktopTouchMove, false); 
