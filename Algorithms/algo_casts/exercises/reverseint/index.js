// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

function reverseInt(n) {
  let reversed = n.toString().split('').reverse().join('');
  return Math.sign(n) * parseInt(reversed); // parseInt considers '5-' as '5' so we just need to multiply by the original sign here
}

module.exports = reverseInt;
