// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
  // creates a dictionary of frequencies
  let frequencies = {};
  str.split('').forEach((char) => {
    frequencies[char] = frequencies[char] ? frequencies[char] + 1 : 1;
  });

  // verify which entry in the dictionary has the greatest value
  // ATTENTION: use for(.. of ..) to iterate strings and arrays and for(.. in .. ) to iterate object key/value keys
  let mostFrequentValue = -1;
  let mostFrequentChar = null;
  for (let char in frequencies) {
    if (frequencies[char] > mostFrequentValue) {
      mostFrequentValue = frequencies[char];
      mostFrequentChar = char;
    }
  }

  return mostFrequentChar;
}

module.exports = maxChar;
