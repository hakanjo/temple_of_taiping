function randomLetter() {
  // TODO: Replace randomLetter with a one-time computed letter-frequency array based on the dictionary
  let scrabbleLetters = [
    ["A", 9 / 98], ["B", 2 / 98], ["C", 2 / 98], ["D", 4 / 98], ["E", 12 / 98],
    ["F", 2 / 98], ["G", 3 / 98], ["H", 2 / 98], ["I", 9 / 98], ["J", 1 / 98],
    ["K", 1 / 98], ["L", 4 / 98], ["M", 2 / 98], ["N", 6 / 98], ["O", 8 / 98],
    ["P", 2 / 98], ["Q", 1 / 98], ["R", 6 / 98], ["S", 4 / 98], ["T", 6 / 98],
    ["U", 4 / 98], ["V", 2 / 98], ["W", 2 / 98], ["X", 1 / 98], ["Y", 2 / 98],
    ["Z", 1 / 98] 
  ]

  let n = Math.random();
  let cumprob = 0;

  for (let i = 0; i < scrabbleLetters.length; i++) {
    let letter = scrabbleLetters[i];
    cumprob += letter[1];
    if (n < cumprob) {
      return letter[0]
    }
  }
  // Failsafe if probabilities don't sum to 1
  return "E"
}

class LetterTile {
  constructor(char, xBoardPos = null, yBoardPos = null) {
    this.char = char;
    // Initial position (on the LetterBoard)
    this.xBoardPos = xBoardPos;
    this.yBoardPos = yBoardPos;
    // Current position
    this.xPos = xBoardPos;
    this.yPos = yBoardPos;
    // Bouncy movement
    this.velocity = 0;
  }

  draw(char = this.char, xPos = this.xPos, yPos = this.yPos) {
    let tilesize = 75;
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // Draw tile
    stroke("#000");
    strokeWeight(4);
    fill("#FFF");
    rect(xPos, yPos, tilesize, tilesize, 20);
    // Draw char
    textSize(tilesize * 2 / 3);
    noStroke();
    fill("#000");
    text(char, xPos, yPos + 5);
  }

  move(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
  }
}

class LetterBoard {
  constructor(xPos = 150, yPos = 220) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.board = [
      [, , , ],
      [, , , ],
      [, , , ],
      [, , , ]
    ];
  }

  draw() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (typeof this.board[i][j] !== "undefined") {
          this.board[i][j].draw();
        }
      }
    }
  }

  fill() {
    let tilesize = 75;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (typeof this.board[j][i] === "undefined") {
          this.board[j][i] = new LetterTile(randomLetter(), this.xPos + tilesize / 2 + i * tilesize, this.yPos + tilesize / 2 + j * tilesize);
        }
      }
    }
  }

  empty() {
    let tilesize = 75;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.board[i][j] = undefined;
      }
    }
  }

  resetBoard() {
    this.empty();
    this.fill();
  }

  flattenBoard() {
    return this.board.reduce((accumulator, currentValue) => accumulator.concat(currentValue));
  }

  findLetters(char) {
    return this.flattenBoard().filter(letter => letter.char == char.toUpperCase());
  }
}

class WordSuggestion {
  constructor(xPos = 100, yPos = 100) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.word = [];
  }

  appendLetter(letter) {
    this.word.push(letter);
  }

  returnLastLetterToBoard() {
    if (this.word.length > 0) {
      let letter = this.word.pop();
      letter.move(letter.xBoardPos, letter.yBoardPos);  
    }
  }

  returnAllLettersToBoard() {
    while (this.word.length > 0) {
      let letter = this.word.pop();
      letter.move(letter.xBoardPos, letter.yBoardPos);  
    }
  }
}

class LetterSuggestion {
  constructor(char = null) {
    this.char = char;
    this.alternatives = null;
  }

  * listAlternatives(char) {

    let l = ["A1", "B1", "C1", "A2", "C2"]
    
    for (let i = 0; i < l.length; i++) {
      if (l[i][0] == char) {
        yield l[i];
      }
    }
  }

  nextAlternative() {
    this.choice = this.alternatives.next();

    if (choice.done == true) {
      this.alternatives = listAlternatives(this.char);
      this.choice = this.alternatives.next();


      console.log(this.choice.value);
    }

    else {
      console.log(this.choice.value);
    }


  }
}




function setup() {
  createCanvas(width = 600, height = 600);
}

function draw() {
  clear();
  board.draw();
}


// TEMPORARY
function * yieldList(x) {
  let l = ["A1", "B1", "C1", "A2", "C2"]
  for (let i = 0; i < l.length; i++) {
    if (l[i][0] == x) {
      yield l[i];
    }
  }
}



function keyPressed() {  
  if (RegExp(/^[a-z]$/, "i").test(key)) {
    // Add the first instance of the letter from the board to the word
    



    // TEMPORARY
    console.log(letter);
    letter.listAlternatives("A");
    console.log(letter.listAlternatives.next);
    // console.log(board.findLetters(key.toUpperCase()));





  }
  else if (key == "Shift") {
    // Cycle through identical letters on the board

    // TEMPORARY
    let y = x.next(); 
    if (y.done == true) {
      x = yieldList("C");
      let y = x.next();
      console.log(y.value);
    }
    else {
      console.log(y.value);
    }



  }
  else if (key == "Backspace") {
    word.returnLastLetterToBoard();
  }
  else if (key == "Enter") {
    // Submit word

    // TEMPORARY
    board.board[1][1].yPos = 100;
    word.appendLetter(board.board[1][1]);
    board.board[1][2].yPos = 100;
    word.appendLetter(board.board[1][2]);


  }
  else if (key == "Escape") {
    board.resetBoard();
  }
}

// Initial LetterBoard
var board = new LetterBoard;
board.fill();
// Initial WordSuggestion
var word = new WordSuggestion;
// Initial LetterSuggestion
var letter = new LetterSuggestion;

// TEMPORARY
var x = yieldList("C");
