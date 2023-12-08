import Track from "./Track.js";
import Knob from "./Knob.js";

const noiseKnob = document.querySelector(".noise");
noiseKnob.addEventListener("mousedown", mousedownHandler);


function mousedownHandler(e) {
    noiseKnob.addEventListener("mousemove", getCursorPosition);
    noiseKnob.addEventListener("mouseup", () => {
        noiseKnob.removeEventListener("mousemove", getCursorPosition);
    });
    console.log(getCursorPosition(e))
}

function getCursorPosition(e) {
    const y = e.clientY - e.target.offsetTop;
    const x = e.clientX - e.target.offsetLeft;
    console.log([x, y])
    return [x, y]
}

const noiseKnob2 = new Knob(document.querySelector(".noise"), {});
console.log(noiseKnob2);