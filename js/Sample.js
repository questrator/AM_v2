export default class Sample {
    constructor(word, file, id) {
        this.word = word;
        this.file = file;
        this.audio = new Audio(this.file);
        this.duration = null;
        this.getDuration();
        this.id = id;    
        this.block = null;
        this.result = null;
      }
    
      getDuration() {
        this.audio.addEventListener("loadedmetadata", () => {
          this.duration = this.audio.duration;
        });
      }
    
      play() {
        this.audio.play();
      }
}