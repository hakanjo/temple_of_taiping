import {newGame} from "./temple-of-taiping.js";

function p5Sketch(sketch) {
  sketch.setup = function() {
    sketch.createCanvas(600, 600);
    newGame(sketch);
  };
}

new p5(p5Sketch);
