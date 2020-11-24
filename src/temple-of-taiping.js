import binaryDictionary from "./binary-dictionary.js";
import Countdown from "./countdown.js";
import findWord from "./find-word.js";
import LetterBoard from "./letter-board.js";
import WordSuggestion from "./word-suggestion.js";

let board;
let word;
let dictionary;
let countdown;
let score;

function drawScore(sketch, score) {
  sketch.textAlign(sketch.CENTER, sketch.CENTER);
  sketch.textFont("Texturina");
  sketch.textSize(72);
  sketch.fill("#000");
  sketch.text("Well done!\nYou survived for\n" + score + " seconds!", 300, 250);
  sketch.textSize(30);
  sketch.text("(Hit Escape to try again.)", 300, 500);
}

export function gameOver(sketch, score) {
  sketch.draw = function() {
    sketch.clear();
    drawScore(sketch, score);
  };
  sketch.keyPressed = function() {
    if (sketch.key == "Escape") {
      newGame(sketch);
    }
  };
}

export function newGame(sketch) {
  dictionary = binaryDictionary();
  word = new WordSuggestion;
  board = new LetterBoard;
  board.fill();
  countdown = new Countdown(30000, sketch.millis());
  templeOfTaiping(sketch, board, word, dictionary);
}

export function templeOfTaiping(sketch, board, word, dictionary) {
  sketch.draw = function() {
    const t = sketch.millis();
    if (countdown.outOfTime(t)) {
      score = countdown.elapsedTime(sketch.millis());
      score = Math.round(score / 100) / 10;
      gameOver(sketch, score);
    } else {
      sketch.clear();
      board.draw(sketch);
      word.draw(sketch);
      countdown.draw(sketch, t);
    }
  };
  sketch.keyPressed = function() {
    if (RegExp(/^[a-z]$/, "i").test(sketch.key)) {
      // Add the first instance of the letter from the board to the word
      board.findLetters(sketch.key.toUpperCase());
      const letter = board.letters.next().value;
      if (letter !== undefined) {
        word.appendLetter(letter);
        board.removeLetter(letter);
      }
    } else if (sketch.key == "Shift") {
      // Cycle through identical letters on the board
      if (word.word.length > 0) {
        const letter = board.letters.next().value;
        if (done) {
          const character = word.getLastCharacter();
          word.returnLastLetterToBoard(board);
          board.findLetters(character);
          const letter = board.letters.next().value;
          word.appendLetter(letter);
          board.removeLetter(letter);
        }
        word.returnLastLetterToBoard(board);
        word.appendLetter(letter);
        board.removeLetter(letter);
      }
    } else if (sketch.key == "Backspace") {
      word.returnLastLetterToBoard(board);
      if (word.word.length > 0) {
        const character = word.getLastCharacter();
        word.returnLastLetterToBoard(board);
        board.findLetters(character);
        const letter = board.letters.next().value;
        word.appendLetter(letter);
        board.removeLetter(letter);
      }
    } else if (sketch.key == "Enter") {
      // Submit word
      const isWordInDictionary = findWord(word.getWord(), dictionary);
      if (isWordInDictionary) {
        countdown.addBonusTime(word.word.length);
        word = new WordSuggestion;
        board.fill();
      }
    } else if (sketch.key == "Escape") {
      countdown.removeTime(5000);
      word.returnAllLettersToBoard(board);
      board.reset();
    }
  };
}
