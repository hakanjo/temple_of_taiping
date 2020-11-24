export default class WordSuggestion {
  constructor(xPos = 100, yPos = 150, tileSize = 75) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.word = [];
    this.tileSize = tileSize;
  }

  draw(sketch) {
    for (const letter of this.word) {
      letter.draw(sketch);
    }
  }

  appendLetter(letter) {
    const i = this.word.length;
    const xPos = this.xPos + this.tileSize / 2 + i % 6 * this.tileSize;
    const yPos = this.yPos + this.tileSize / 2 + Math.floor(i / 6) * this.tileSize;
    this.word.push(letter);
    letter.xPos = xPos;
    letter.yPos = yPos;
  }

  returnLastLetterToBoard(board) {
    if (this.word.length > 0) {
      const letter = this.word.pop();
      board.returnLetterToBoard(letter);
    }
  }

  returnAllLettersToBoard(board) {
    while (this.word.length > 0) {
      const letter = this.word.pop();
      board.returnLetterToBoard(letter);
    }
  }

  getLastCharacter() {
    if (this.word.length > 0) {
      return this.word.slice(-1).pop().character;
    }
  }

  getWord() {
    let word = "";
    for (const letter of this.word) {
      word += letter.character;
    }
    return word;
  }
}
