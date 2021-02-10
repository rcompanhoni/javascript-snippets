// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

// using array built in methods split + reverse + join
function reverse(str) {
  return str.split('').reverse().join('');
}

// not using .reverse() -- appends each new char to the start of reversed: a, pa, ppa, eppa, leppa
function reverse(srt) {
  let reversed = '';

  for (let character of srt) {
    reversed = character + reversed;
  }

  return reversed;
}

// using reduce() -- same as previous solution
function reverse(srt) {
  return srt.split('').reduce((rev, char) => char + rev, '');
}

module.exports = reverse;
