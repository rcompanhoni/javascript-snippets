// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function myMaxChar(str) {
    const strArr = str.split('');

    const frequencies = strArr.reduce((freq, char) => {
        freq[char] = (freq[char] || 0) + 1;
        return freq;
    }, {});

    return Object.keys(frequencies).reduce((char, currentChar) => {
        if (frequencies[currentChar] > frequencies[char]) {
            char = currentChar;
        }

        return char;
    }, strArr[0]);
}

// notice the difference of for...of and for...in; for..of is for simple arrays and for...in for iterating object keys
function maxChar(str) {
    const charMap = {};
    let max = 0;
    let maxChar = '';

    for (let char of str) {
        if (charMap[char]) {
            charMap[char]++;
        } else {
            charMap[char] = 1;
        }
    }

    for (let char in charMap) {
        if (charMap[char] > max) {
            max = charMap[char];
            maxChar = char;
        }
    }

    return maxChar;
}

const bestSolution = myMaxChar;
module.exports = bestSolution;
