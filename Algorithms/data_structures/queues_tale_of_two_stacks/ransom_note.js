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
    
    const m = lines[0].split(' ')[0];
    const n = lines[0].split(' ')[1];
    const magazine = lines[1];
    const ransom = lines[2];

    const result = ransomNote(m, n, magazine, ransom);
    console.log(result);
}

function ransomNote(m, n, magazine, ransom) {
    let dictionary = {};

    // dictionary of words: quantity
    ransom.split(' ').map(word => {
        dictionary[word] = ((dictionary[word] || 0) + 1);
    });

    // evaluates which words were 'satisfied'
    magazine.split(' ').map(word => {
        if (dictionary[word]) {
            dictionary[word]--;
        }
    });

    return Object.keys(dictionary).some(key => dictionary[key] > 0) ? 'NO' : 'YES'; 
}




