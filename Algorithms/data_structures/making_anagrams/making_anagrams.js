var fs = require('fs');
var path = require('path');

var file = path.join(__dirname, 'input.txt');

fs.readFile(file, function (err, contents) {
      if (err) {
          return console.log(err)
      }

      main(contents);
});

function main(contents) {
    const lines = contents.toString().split(/\r?\n/);
    
    let a = lines[0];
    let b = lines[1];

    console.log(makingAnagrams(a, b));
}

function makingAnagrams(a, b) {
    let freqs = {};
    a.split('').forEach(char => freqs[char] = (freqs[char] || 0) + 1); // increment
    b.split('').forEach(char => freqs[char] = (freqs[char] || 0) - 1); // decrement
    const result = Object.keys(freqs).reduce((sum, key) => sum + Math.abs(freqs[key]), 0);
    return result;
}




