// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'

function steps(n) {
  for (let row = 0; row < n; row++) {
    let stair = '';

    for (let column = 0; column < n; column++) {
      if (column <= row) {
        stair += '#';
      } else {
        stair += ' ';
      }
    }

    console.log(stair);
  }
}

// recursive version
function steps(n, row = 0, stair = '') {
  // base case, when it gets to the last row we already printed all rows so just finish
  if (n === row) {
    return;
  }

  // at the end of a row, print the stair
  if (n === stair.length) {
    console.log(stair);
    return steps(n, row + 1);
  }

  // fill the stair if not in the end yet
  if (stair.length <= row) {
    stair += '#';
  } else {
    stair += ' ';
  }

  return steps(n, row, stair);
}

module.exports = steps;
