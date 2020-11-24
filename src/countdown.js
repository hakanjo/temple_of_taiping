export default class Countdown {
  constructor(time, clock, xPos = 300, yPos = 100) {
    this.time = time;
    this.clock = clock;
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = "#000";
  }

  addBonusTime(wordLength) {
    this.time += wordLength * 0.8 * 1000;
  }

  draw(sketch, timepoint) {
    let time = this.time - this.elapsedTime(timepoint);
    time = Math.round(time / 100) / 10;
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textFont("Texturina");
    sketch.textSize(72);
    sketch.fill(this.color);
    sketch.text(time, this.xPos, this.yPos);
  }

  elapsedTime(timepoint) {
    return timepoint - this.clock;
  }

  outOfTime(timepoint) {
    return (timepoint - this.clock) >= this.time;
  }

  removeTime(time) {
    this.time -= time;
  }
}
