// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

function anagrams(stringA, stringB) {
    const parsedA = stringA.replace(/[^\w]/g, "").toLowerCase();
    const parsedB = stringB.replace(/[^\w]/g, "").toLowerCase();

    let freqs = {};
    parsedA.split('').forEach(char => freqs[char] = (freqs[char] || 0) + 1); // increment
    parsedB.split('').forEach(char => freqs[char] = (freqs[char] || 0) - 1); // decrement
    const result = Object.keys(freqs).reduce((sum, key) => sum + Math.abs(freqs[key]), 0);    

    return result === 0;
}

module.exports = anagrams;
