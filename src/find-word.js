export default function findWord(word, dictionary) {
  word = word.toLowerCase();
  const wordLength = word.length;

  if (!dictionary[wordLength]) {
    return false;
  }

  const words = dictionary[wordLength].length / wordLength;
  let low = 0;
  let high = words - 1;
  let mid = Math.floor(words / 2);

  while (high >= low) {
    const found = dictionary[wordLength].substr(wordLength * mid, wordLength);
    if (word === found) {
      return true;
    } else if (word < found) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
    mid = Math.floor((low + high) / 2);
  }
  return false;
}
