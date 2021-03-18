// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a pyramid shape
// with N levels using the # character.  Make sure the
// pyramid has spaces on both the left *and* right hand sides
// --- Examples
//   pyramid(1)
//       '#'
//   pyramid(2)
//       ' # '
//       '###'
//   pyramid(3)
//       '  #  '
//       ' ### '
//       '#####'

function pyramid(n) {
  const totalColumns = n * 2 - 1;
  const midpoint = Math.floor(totalColumns / 2);

  for (let row = 0; row < n; row++) {
    let level = '';

    for (let column = 0; column < totalColumns; column++) {
      // check if current column is within the range where a # should be written
      if (column >= midpoint - row && column <= midpoint + row) {
        level += '#';
      } else {
        level += ' ';
      }
    }
    console.log(level);
  }
}

module.exports = pyramid;
