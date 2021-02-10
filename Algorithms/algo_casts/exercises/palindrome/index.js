// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

function palindrome(str) {
  return str === str.split('').reverse().join('');
}

// compares first char and n, second char and n-1 and so on to determine if it's a palindrome
function palindrome(str) {
  const lastCharIndex = str.length - 1;

  return str.split('').every((char, i) => {
    return char === str[lastCharIndex - i];
  });
}

module.exports = palindrome;
