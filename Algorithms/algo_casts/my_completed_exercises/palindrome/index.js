// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

function myPalindrome(str) {
    const reversed = str.split('').reduce((rev, char) => char + rev, '');
    return str === reversed;
}

// uses the 'Array.prototype.reverse()'
function palindrome1(str) {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

// not ideal: demonstrates 'every' which returns true if the cb evaluates true for each array element. In this case, compare the current char with its 'antipode'
function palindrome2(str) {
    return str.split('').every((char, i) => {
        return char === str[str.length - i - 1];
    });
}

palindrome1("abba");

const bestSolution = palindrome1;
module.exports = bestSolution;
