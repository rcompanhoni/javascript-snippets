var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

var readBasePath = path.join(__dirname, 'corpus');
var writeBasePath = path.join(__dirname, 'corpus_TT');

var filePaths = {};
fs.readdir(readBasePath, (err, files) => {
    // lê diretório e monta dicionário no formato << path do corpus de leitura, path do corpus TT >>
    files.forEach(file => {
        var readFilePath = path.join(readBasePath, file);
        var writeFilePath = path.join(writeBasePath, file.split('.')[0] + '_TT.txt');

        filePaths[readFilePath] = writeFilePath;
    });

    // pré-processa cada arquivo corpus para corpus TT (i.e. pré-processado para utilização no Tree Tagger)
    Object.keys(filePaths).forEach((readFilePath) => {
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
              var writeFilePath = filePaths[readFilePath];
              fs.writeFile(writeFilePath, parsedHtml, function(err) {
                if(err) {
                    return console.log(err);
                }
            
                console.log('Arquivo criado em', writeFilePath);
            });    
        });
    });
  });


