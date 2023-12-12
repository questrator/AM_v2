export default class Track {    
  constructor(selector, pause = 4000) {
    this.selector = new TomSelect(selector, selectorSettings);
    this.samples = [];
    this.pause = pause;
    this.current = 0;

    this.noiseRange = document.querySelector("#range-noise");
    this.noiseRange.addEventListener("change", this.changeNoise.bind(this));
    this.noiseLevel = 0;
    this.noiseLabel = document.querySelector(".player-noise-label");
    this.noiseLevels = ["нет шума", "шум 3 dB", "шум 6 dB"];

    this.buttonPlay = document.querySelector(".button-play");
    this.buttonPlay.addEventListener("click", this.playSample.bind(this));
    this.buttonPrev = document.querySelector(".button-prev");
    this.buttonPrev.addEventListener("click", this.prevSample.bind(this));
    this.buttonNext = document.querySelector(".button-next");
    this.buttonNext.addEventListener("click", this.nextSample.bind(this));

    this.trackBlock = document.querySelector("#track");
    this.controls = document.querySelector("#controls");

    this.results = [];
    this.result = 0;
    this.resultBad = document.querySelector(".result-bad");
    this.resultBad.addEventListener("click", this.resultToggle.bind(this));
    this.resultGood = document.querySelector(".result-good");
    this.resultGood.addEventListener("click", this.resultToggle.bind(this));
    this.resultScoreBlock = document.querySelector(".result-score");
    this.resultWordsBlock = document.querySelector(".result-words");

    this.noise0 = new Audio("./sounds/noise0.mp3");
    this.noise1 = new Audio("./sounds/noise1.mp3");
    this.noise2 = new Audio("./sounds/noise2.mp3");
    this.noises = [this.noise0, this.noise1, this.noise2];
  }

  resultToggle(event) {
    const value = event.target.dataset.value;    
    this.setResult(value === "good" ? 1 : 0);
    const label = this.samples[this.current].block.querySelector(".sample-block-label");
    label.dataset.result = value;
    // console.log(this.samples[this.current].block)
    event.target.dataset.selected = 1;
    this[value === "good" ? "resultBad" : "resultGood"].dataset.selected = 0;
    this.samples[this.current].block.dataset.result = value;
    this.getWordsResult();
    this.moveCurrent();
    console.log(this.results);
  }

  setResult(result) {
    this.results[this.current] = result;
    this.result = Math.round(this.results.reduce((r, e) => r + e, 0) / this.results.length * 100);
    this.resultScoreBlock.textContent = `Результат: ${this.result} %`;
    return this.result;
  }

  setResultLabel(result) {
    
  }

  moveCurrent() {
    this.samples[this.current].block.dataset.active = 0;
    this.samples[this.current].block.dataset.current = 0;
    this.samples[this.current].block.dataset.played = 1;
    if (this.current < this.samples.length - 1) {
      this.current++;
    }
    this.samples[this.current].block.dataset.current = 1;
    track.resultBad.dataset.selected = 0;
    track.resultGood.dataset.selected = 0;
  }

  getWordsResult() {
    const totalWords = this.samples.length;
    const playedWords = this.samples.reduce((r, e) => e.block.dataset.result != "0" ? r + 1 : r, 0);
    this.resultWordsBlock.textContent = `Оценено слов: ${playedWords} из ${totalWords}`;
  }

  changeNoise() {
    this.noiseLevel = +(this.noiseRange.value);
    this.noiseLabel.textContent = this.noiseLevels[this.noiseRange.value];
  }

  playSample() {
    const audio = this.trackBlock.querySelector(`audio[data-id='${this.current}']`);
    const noise = document.querySelector(`audio[data-noise="${this.noiseLevel}"]`);

    if (this.samples.length === 0) return; 
    this.samples[this.current].audio.addEventListener("play", () => {
      this.samples[this.current].block.dataset.played = 0;
    });
    audio.addEventListener("ended", this.endedHandler.bind(this));

    noise.play();
    setTimeout(function() {
      audio.play();
    }, 200);    

    setTimeout(function() {
      // const clone = audio.cloneNode(true);
      // audio.replaceWith(clone);
      noise.pause();
      noise.currentTime = 0;
    }, this.samples[this.current].duration * 1000 + 500);

    this.samples[this.current].block.dataset.active = 1;
  }

  endedHandler() {
    // this.samples[this.current].block.dataset.active = 0;
    // this.samples[this.current].block.dataset.current = 0;
    // this.samples[this.current].block.dataset.played = 1;
    // if (this.current < this.samples.length - 1) {
    //   this.current++;
    // }
    // this.samples[this.current].block.dataset.current = 1;
  }

  prevSample() {
    if (this.current === 0) return;
    this.samples[this.current].block.dataset.current = 0;
    this.current--;
    this.samples[this.current].block.dataset.current = 1;
  }
  
  nextSample() {
    if (this.current + 1 === this.samples.length) return;
    this.samples[this.current].block.dataset.current = 0;
    this.current++;
    this.samples[this.current].block.dataset.current = 1;
  }
}