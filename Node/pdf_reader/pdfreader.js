var pdfreader = require('pdfreader');
var fs = require('fs');

var rows = {};

function writeRowToFile() {
  Object.keys(rows) 
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
    .forEach((y) => { 
      var content = (rows[y] || []).join('');
      fs.appendFileSync('message.txt', `${content}\n`);
    });
}

new pdfreader.PdfReader().parseFileItems('pdf-test.pdf', function(err, item) {
  if (!item || item.page) {
    writeRowToFile();
    rows = {};
  }
  else if (item.text) {
    // accumulate text items into rows object, per line
    (rows[item.y] = rows[item.y] || []).push(item.text);
  }
});