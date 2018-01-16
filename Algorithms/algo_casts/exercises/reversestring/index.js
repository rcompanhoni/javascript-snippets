// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

// uses the NOT recommended classical loop syntax
function myReverse(str) {
  const splitted = str.split('');
  let reversed = [];

  for (let i = (splitted.length - 1); i >= 0; i--) {
    reversed.push(splitted[i]);
  }

  return reversed.join('');
}

// uses Array.prototype.reverse()
function reverse1(str) {
  return str
    .split('')
    .reverse()
    .join('');
}

// creates a 'reversed' array and uses the for..of loop syntax
function reverse2(str) {
  let reversed = '';
  
  for (let character of str) {
    reversed = character + reversed;
  }

  return reversed;
}

// uses 'reduce' from ES5
function reverse3(str) {
  return str.split('').reduce((rev, char) => char + rev, '');
}

const bestSolution = reverse3;
module.exports = bestSolution;
