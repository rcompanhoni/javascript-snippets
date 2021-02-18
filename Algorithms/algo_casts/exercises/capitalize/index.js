// --- Directions
// Write a function that accepts a string.  The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.
// --- Examples
//   capitalize('a short sentence') --> 'A Short Sentence'
//   capitalize('a lazy fox') --> 'A Lazy Fox'
//   capitalize('look, it is working!') --> 'Look, It Is Working!'

// split the words and, for each word capitalize the first letter and then join it to the remaining of the word
function capitalize(str) {
  const capitalized = [];

  for (let word of str.split(' ')) {
    const firstLetter = word[0].toUpperCase();
    const remaining = word.slice(1);
    capitalized.push(`${firstLetter}${remaining}`);
  }

  return capitalized.join(' ');
}

// split each element in the string and iterate through it -- if the previous element is a space then capitalize it add it to the result
function capitalize(str) {
  let result = str[0].toUpperCase(); // the overall strategy doesn't work for the first character so we initialize the result array with the first letter already capitalized

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }

  return result;
}

module.exports = capitalize;
