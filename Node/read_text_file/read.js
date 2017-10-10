var fs = require('fs');
var path = require('path');

var file = path.join(__dirname, 'input.txt');

fs.readFile(file, function (err, contents) {
      if (err) {
          return console.log(err)
      }

      var lines = contents.toString();
      console.log(lines);
});
