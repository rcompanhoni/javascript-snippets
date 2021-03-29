// --- Directions
// Write a function that returns the number of vowels
// used in a string.  Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.
// --- Examples
vowels('Hi There!')-- > 3;
vowels('Why do you ask?')-- > 4;
vowels('Why?')-- > 0;

function vowels(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  return str
    .toLowerCase()
    .split('')
    .reduce((count, letter) => {
      if (vowels.includes(letter)) {
        count++;
      }
      return count;
    }, 0);
}

function vowels(str) {
  const matches = str.match(/[aeiou]/gi); // return an array of matches or null if no matches are found
  return matches ? matches.length : 0;
}

module.exports = vowels;
