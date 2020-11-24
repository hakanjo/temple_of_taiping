import LetterTile from "./letter-tile.js";
import getRandomLetter from "./random-letter.js";

export default class LetterBoard {
  constructor(xPos = 150, yPos = 270, nletters = 16, ncols = 4, tileSize = 75) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.board = new Array(nletters);
    this.ncols = ncols;
    this.tileSize = tileSize;
    this.letters = undefined;
  }

  removeLetter(letter) {
    this.board[letter.boardPos] = undefined;
  }

  draw(sketch) {
    for (const letter of this.board) {
      if (letter !== undefined) {
        letter.draw(sketch);
      }
    }
  }

  fill() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] === undefined) {
        const xPos = this.xPos + this.tileSize / 2 + i % this.ncols * this.tileSize;
        const yPos = this.yPos + this.tileSize / 2 + Math.floor(i / this.ncols) * this.tileSize;
        this.board[i] = new LetterTile(getRandomLetter(), i, xPos, yPos);
      }
    }
  }

  empty() {
    for (const letter of this.board) {
      this.removeLetter(letter);
    }
  }

  reset() {
    this.empty();
    this.fill();
  }

  returnLetterToBoard(letter) {
    const i = letter.boardPos;
    const xPos = this.xPos + this.tileSize / 2 + i % this.ncols * this.tileSize;
    const yPos = this.yPos + this.tileSize / 2 + Math.floor(i / this.ncols) * this.tileSize;
    this.board[letter.boardPos] = letter;
    letter.xPos = xPos;
    letter.yPos = yPos;
  }

  findLetters(character) {
    const letters = this.board.filter((tile) => tile !== undefined && tile.character == character);
    this.letters = letters[Symbol.iterator]();
  }
}
