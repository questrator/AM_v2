import WaveSurfer from "./wavesurfer.esm.js";
import Spectrogram from "./spectrogram.esm.js";

import words from "./words.js";

console.log(words);

const root = document.querySelector(".root");

const wordFiles = Object.entries(words);

for (let i = 0; i < wordFiles.length; i++) {
  const sampleBlock = document.createElement("div");
  sampleBlock.classList.add("sample-block");
  sampleBlock.dataset.id = i;
  sampleBlock.dataset.word = wordFiles[i][0];
  root.appendChild(sampleBlock);

  const pauseBlock = document.createElement("div");
  pauseBlock.classList.add("pause-block");
  pauseBlock.dataset.duration = i === 0 ? 500 : 4000;
  sampleBlock.appendChild(pauseBlock);

  const pauseTimer = document.createElement("div");
  pauseTimer.classList.add("pause-timer");
  pauseTimer.dataset.duration = i === 0 ? 500 : 4000;
  pauseBlock.appendChild(pauseTimer);

  const pauseLine = document.createElement("div");
  pauseLine.classList.add("pause-line");
  pauseLine.dataset.duration = i === 0 ? 500 : 4000;
  pauseBlock.appendChild(pauseLine);

  const wordBlock = document.createElement("div");
  wordBlock.classList.add("word-block");
  wordBlock.dataset.id = i;
  wordBlock.dataset.word = wordFiles[i][0];
  sampleBlock.appendChild(wordBlock);

  const titleBlock = document.createElement("div");
  titleBlock.classList.add("title-block");
  titleBlock.dataset.id = i;
  titleBlock.dataset.word = wordFiles[i][0];
  titleBlock.textContent = wordFiles[i][0];
  wordBlock.appendChild(titleBlock);

  const wsBlock = document.createElement("div");
  wsBlock.classList.add("ws-block");
  wsBlock.dataset.id = i;
  wordBlock.appendChild(wsBlock);

  const ws = WaveSurfer.create({
    container: `.ws-block[data-id='${i}']`,
    waveColor: "#4F4A85",
    progressColor: "steelblue",
    cursorColor: "transparent",
    url: wordFiles[i][1],
    height: 40,
  });

  //   ws.registerPlugin(
  //     Spectrogram.create({
  //       labels: true,
  //       height: 100,
  //       splitChannels: false,
  //       frequencyMax: 6000,
  //       frequencyMin: 100,
  //     })
  //   );

  ws.on("click", () => {
    ws.play();
  });
}

const sampleTest = document.querySelector(".sample-test");
sampleTest.addEventListener("click", preloadSample);

function preloadSample(event) {
  const audio = new Audio(words["башня"]);
  let duration = 0;
  let k = 0;
  const load = new Promise((res, rej) => {
    audio.addEventListener("loadedmetadata", () => {
      duration = audio.duration;
      k = duration * 1000;
      res(k);
    });
  });
  load.then(result => playSample(audio, duration));
}

function playSample(audio, duration) {
  audio.play();

  var start = null;
  var element = sampleTest;

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    element.style.backgroundImage = `
    linear-gradient(90deg,
        rgba(64, 176, 235, 0.9) ${(audio.currentTime) * 160 - 60}%,
        rgba(120, 230, 255, 1.0) ${(audio.currentTime) * 160 - 20}%,
        rgba(255, 255, 255, 0.0) ${(audio.currentTime) * 160 - 20}%,
        rgba(255, 255, 255, 0.0) ${(audio.currentTime ) * 160 + 30}%,
        rgba(255, 255, 255, 0.0) ${""}110%)`;
    element.style.backgroundBlendMode = "multiply";
    console.log(duration * 1000);
    if (progress < duration * 1500) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}
