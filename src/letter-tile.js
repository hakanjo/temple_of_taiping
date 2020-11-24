export default class LetterTile {
  constructor(character, boardPos = null, xPos = null, yPos = null, tileSize = 75) {
    this.character = character;
    // Initial position (on the LetterBoard)
    this.boardPos = boardPos;
    // Current position
    this.xPos = xPos;
    this.yPos = yPos;
    this.tileSize = tileSize;
    this.tileStrokeColor = "#FCEBBF";
    this.tileFillColor = "#47128C";
    this.characterColor = "#FFF";
  }

  draw(sketch) {
    sketch.rectMode(sketch.CENTER);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    // Draw tile
    sketch.stroke(this.tileStrokeColor);
    sketch.strokeWeight(4);
    sketch.fill(this.tileFillColor);
    sketch.rect(this.xPos, this.yPos, this.tileSize, this.tileSize, 20);
    // Draw character
    sketch.textFont("Texturina");
    sketch.textSize(this.tileSize * 2 / 3);
    sketch.noStroke();
    sketch.fill(this.characterColor);
    sketch.text(this.character, this.xPos, this.yPos + 5);
  }

  move(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }
}
