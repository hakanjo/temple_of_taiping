export default function getRandomLetter() {
  const scrabbleLetters = [
    ["A", 9 / 98], ["B", 2 / 98], ["C", 2 / 98], ["D", 4 / 98], ["E", 12 / 98],
    ["F", 2 / 98], ["G", 3 / 98], ["H", 2 / 98], ["I", 9 / 98], ["J", 1 / 98],
    ["K", 1 / 98], ["L", 4 / 98], ["M", 2 / 98], ["N", 6 / 98], ["O", 8 / 98],
    ["P", 2 / 98], ["Q", 1 / 98], ["R", 6 / 98], ["S", 4 / 98], ["T", 6 / 98],
    ["U", 4 / 98], ["V", 2 / 98], ["W", 2 / 98], ["X", 1 / 98], ["Y", 2 / 98],
    ["Z", 1 / 98]
  ];

  const n = Math.random();
  let cumprob = 0;

  for (let i = 0; i < scrabbleLetters.length; i++) {
    const letter = scrabbleLetters[i];
    cumprob += letter[1];
    if (n < cumprob) {
      return letter[0];
    }
  }

  // Failsafe if probabilities don't sum to 1
  return "E";
}
