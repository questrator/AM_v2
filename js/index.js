import Track from "./Track.js";

const noiseKnob = document.querySelector(".noise");
noiseKnob.addEventListener("mousedown", mousedownHandler);
noiseKnob.addEventListener("touchstart", touchstartHandler);

function mousedownHandler(e) {
    rotateEase(e);
    noiseKnob.addEventListener("mousemove", rotate);
    noiseKnob.addEventListener("mouseup", () => {
        noiseKnob.removeEventListener("mousemove", rotate);
    });
}

function touchstartHandler(e) {
    console.log("tstart")
    rotateEase(e);
    noiseKnob.addEventListener("touchmove", rotate);
    noiseKnob.addEventListener("touchend", () => {
        noiseKnob.removeEventListener("touchmove", rotate);
    });
}

function getAngle(e) {
    if (e.touches) e = e.touches[0];
    const center = [e.target.offsetHeight / 2, e.target.offsetWidth / 2];
    const position = [e.clientX - e.target.parentElement.parentElement.offsetLeft, e.clientY - e.target.parentElement.parentElement.offsetTop];
    const [cX, cY] = center.map((e, i) => position[i] - e);
    return 180 / Math.PI * Math.atan2(cY, cX) - 135;
}

function rotate(e) {  
    console.log("rotate")  
    noiseKnob.style.transitionDuration = "0ms";
    noiseKnob.style.transform = `rotate(${getAngle(e)}deg)`;
}
function rotateEase(e) {
    noiseKnob.style.transitionDuration = "300ms";
    noiseKnob.style.transform = `rotate(${getAngle(e)}deg)`;
}