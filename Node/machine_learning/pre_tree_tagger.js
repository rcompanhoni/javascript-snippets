var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

var readFilePath = path.join(__dirname, 'corpus', 'policia.txt');
var writeFilePath = path.join(__dirname, 'corpus_TT', 'policia_TT.txt');

fs.readFile(readFilePath, function (err, buffer) {
      if (err) {
          return console.log(err)
      }

      // lê do arquivo e remove diacríticos (i.e. acentos, cedilha)
      var contents = buffer.toString();
      contents = contents.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      // parse do HTML 
      var $ = cheerio.load(contents);
      var parsedHtml = $('body').text().trim();

      // salva em arquivo .txt
      fs.writeFile(writeFilePath, parsedHtml, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("Arquivo pré Tree Tagger gerado.");
    });    
});