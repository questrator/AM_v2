import Track from "./Track.js";

const noiseKnob = document.querySelector(".noise");
noiseKnob.addEventListener("mousedown", mousedownHandler);

function mousedownHandler(e) {
    console.log(e.target)
    rotateEase(e);
    noiseKnob.addEventListener("mousemove", rotate);
    noiseKnob.addEventListener("mouseup", () => {
        noiseKnob.removeEventListener("mousemove", rotate);
    });
}

function getAngle(e) {
    const center = [e.target.offsetHeight / 2, e.target.offsetWidth / 2];
    const position = [e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop];
    console.log(center, position)
    const [cX, cY] = center.map((e, i) => position[i] - e);
    return 180 / Math.PI * Math.atan2(cY, cX) - 135;
}

function rotate(e) {    
    noiseKnob.style.transitionDuration = "0ms";
    noiseKnob.style.transform = `rotate(${getAngle(e)}deg)`;
}
function rotateEase(e) {
    noiseKnob.style.transitionDuration = "300ms";
    noiseKnob.style.transform = `rotate(${getAngle(e)}deg)`;
}