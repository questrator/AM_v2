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
  const sampleTestLength = sampleTest.offsetWidth;
  const buttonPlay = document.querySelector(".button-play");
  buttonPlay.addEventListener("click", playSample);
  
  function playSample(event) {
      const audio = new Audio(words["башня"]);
      let duration = 0;
      audio.addEventListener("loadedmetadata", () => {
          duration = audio.duration;
          console.log(duration);
      });
      audio.play();
  
      var start = null;
      var element = sampleTest;
  
      function step(timestamp) {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          element.style.backgroundImage =
          `linear-gradient(90deg, rgba(79, 163, 241, 1) ${audio.currentTime / duration * 100}%, rgba(253, 199, 78, 1) ${audio.currentTime / duration * 100}%)`;
          if (progress < 2000) {
              window.requestAnimationFrame(step);
          }
      }
  
      window.requestAnimationFrame(step);
  }