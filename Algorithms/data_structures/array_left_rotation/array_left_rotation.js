var fs = require('fs');
var path = require('path');

var file = path.join(__dirname, 'input.txt');

fs.readFile(file, function (err, contents) {
      if (err) {
          return console.log(err);
      }

      main(contents);
});

function main(contents) {
    const lines = contents.toString().split(/\r?\n/);
    const params = lines[0].split(/\s/); 

    const size = params[0];
    const rotations = params[1];
    const values = lines[1].split(/\s/);
    
    console.log(values.join(" "));

    /* just remove the element at the beginning and push it to the end of the array */
    for (let i = 0; i < rotations; i++) {
        let element = values.shift();
        values.push(element);
    }

    console.log(values.join(" "));
}




