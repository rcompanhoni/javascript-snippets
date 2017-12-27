// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

function myReverseInt(n) {
    let intStr = n.toString().split('');
    let sign = '';

    if (intStr[0] === '-') {
        sign = '-';
        intStr = intStr.slice(0);
    }

    const reversedStr = sign + intStr.reverse().join('');
    return parseInt(reversedStr);
}

// multiplies the reversed string by Math.sign(n) which will keep the original sign
function reverseInt(n) {
   const reversed = n.toString().split('').reverse().join('');
   return parseInt(reversed) * Math.sign(n);
}

const bestSolution = reverseInt;
module.exports = bestSolution;
