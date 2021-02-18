// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

/* SOLUTION 1 - USING A CHAR MAP -- this solution makes 3 iterations */

function getCharMap(inputString) {
  // filter out punctuation and converts to lower case
  const parsedString = inputString.replace(/[^\w]/g, '').toLowerCase();

  // assembles the char map
  return parsedString.split('').reduce((acc, char) => {
    acc[char] = acc[char] + 1 || 1;
    return acc;
  }, {});
}

function anagrams(stringA, stringB) {
  // get dictionary of char frequencies
  const charMapA = getCharMap(stringA);
  const charMapB = getCharMap(stringB);

  // ensure one is not a substring of another (e.g. 'hell' and 'hello')
  if (Object.keys(charMapA).length !== Object.keys(charMapB).length) {
    return false;
  }

  // ensure both dictionaries have the same frequencies
  for (let charKey in charMapA) {
    if (charMapA[charKey] !== charMapB[charKey]) {
      return false;
    }
  }

  return true;
}

/* SOLUTION 2 - USING THE METHOD SORT -- this solution makes np iterations */

// filter out punctuation, converts to lower case, split to an array, SORT THE ARRAY and join it back to a simple string
function cleanString(str) {
  return str.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
}

function anagrams(stringA, stringB) {
  return cleanString(stringA) === cleanString(stringB); // just make a simple comparison between the parsed (and sorted) strings
}

module.exports = anagrams;
