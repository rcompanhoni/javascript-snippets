var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var child_process = require('child_process');

var corpusBasePath = path.join(__dirname, 'corpus');
var corpusTTBasePath = path.join(__dirname, 'corpus_TT');
var corpusTaggedBasePath = path.join(__dirname, 'corpus_tagged');

var filePaths = {};

CreateCorpusFileIndex()
    .then(PrepareCorpusForTreeTagger)
    .then(RunTreeTagger);
    // .then(CreateTaggedDictionary)

// lê diretório e monta dicionário no formato < path do corpus de leitura, path do corpus TT >
function CreateCorpusFileIndex() {
    return new Promise((resolve, reject) => {
        fs.readdir(corpusBasePath, (err, files) => {
            if (err) {
                console.log(err);
                reject();
            }

            files.forEach(file => {
                var readFilePath = path.join(corpusBasePath, file);
                var writeFilePath = path.join(corpusTTBasePath, file.split('.')[0] + '_TT.txt');
        
                filePaths[readFilePath] = writeFilePath;
            });

            resolve();
        });
    });
}

// TODO -- cada texto deve ser colocado em um arquivo separado, em um diretório que indique sua categoria
// pré-processa cada arquivo do corpus para um arquivo com sufixo TT (i.e. pré-processado para utilização no Tree Tagger)
function PrepareCorpusForTreeTagger() {
    return new Promise((resolve, reject) => {
        var readFilePaths = Object.keys(filePaths);
        var filesToProcess = readFilePaths.length;

        readFilePaths.forEach((readFilePath) => {
            fs.readFile(readFilePath, function (err, buffer) {
                if (err) {
                    console.log(err);
                    reject();
                }
        
                // lê do arquivo e remove diacríticos (i.e. acentos, cedilha)
                var contents = buffer.toString();
                contents = contents.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        
                // parse do HTML 
                var $ = cheerio.load(contents);
                var parsedHtml = $('body').text().trim();
        
                // TODO -- quebrar pelo título TEXT. Arquivos em disco são necessários para executar o Tree Tagger
                var texts = parsedHtml.split('TEXTO');

                // salva em arquivo .txt
                var writeFilePath = filePaths[readFilePath];
                fs.writeFile(writeFilePath, parsedHtml, function(err) {
                    if(err) {
                        console.log(err);
                        reject();
                    }
                
                    console.log('Arquivo criado em', writeFilePath);
                    filesToProcess--;

                    if (filesToProcess === 0) {
                        resolve();
                    }
                });    
            });
        });
    });
}

// executa Tree Tagger para anotar o corpus pré-processado
function RunTreeTagger() {
    return new Promise((resolve, reject) => {
        fs.readdir(corpusTTBasePath, (err, files) => {
            if (err) {
                console.log(err);
                reject();
            }

            var filesToProcess = files.length;

            files.forEach(file => {
                var sourceFileName = path.join(corpusTTBasePath, file);
                var targetFileName = path.join(corpusTaggedBasePath, file.split('_TT.')[0] + '_ANNOTATED.txt');
                var command = path.join(__dirname, 'TreeTagger/bin/tag-portuguese') + ' ' +  sourceFileName + ' > ' + targetFileName;
                              
                child_process.exec(command, function(err, stdout, stderr) {
                    if (err) {
                        console.log(err);
                        reject();
                    }
            
                    console.log('Arquivo ', targetFileName, ' anotado com sucesso.');
                    filesToProcess--;
                    if (filesToProcess === 0) {
                        resolve();
                    }
                });
            });
        });
    });
}

// ALTERNATIVA -- versão assíncrona com Promise
function ProcessCorpusForTT() {
    return new Promise((resolve, reject) => {
        let categoriesToProcess;

        fs.readdir(corpusBasePath, (err, files) => {
            if (err) {
                console.log(err);
                reject();
            }

            categoriesToProcess = files.length;

            // cada arquivo do corpus é uma categoria
            files.forEach(categoryFile => {
                const readFilePath = path.join(corpusBasePath, categoryFile);

                fs.readFile(readFilePath, function (err, buffer) {
                    if (err) {
                        console.log(err);
                        reject();
                    }

                    // lê do arquivo e remove diacríticos (i.e. acentos, cedilha)
                    var contents = buffer.toString();
                    contents = contents.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

                    // parse do HTML 
                    var $ = cheerio.load(contents);
                    var parsedHtml = $('body').text().trim();
                    
                    // gera array de textos (quebra pelo título 'TEXTO 123').
                    var texts = parsedHtml.split(/TEXTO\s{0,1}[0-9]+/);

                    // cria diretório para a categoria
                    const categoryName = categoryFile.split('.')[0];
                    const categoryFolderPath = path.join(corpusTTBasePath, categoryName);
                    
                    if (!fs.existsSync(categoryFolderPath)) {
                        fs.mkdirSync(categoryFolderPath);
                    }
                    
                    // cria um novo arquivo no diretório da categoria, pronto para ser processado pelo Tree Tagger
                    let filesToProcess = texts.length - 1;
                    texts.slice(1).map((text, index) => {
                        const writeFilePath = path.join(categoryFolderPath, `TEXTO_${index + 1}.txt`);
                        const contents = text.trim();

                        fs.writeFile(writeFilePath, contents, function(err) {
                            if(err) {
                                console.log(err);
                                reject();
                            }
                            
                            filesToProcess--;
                            if (filesToProcess === 0) {
                                console.log('Arquivos pré TT para a categoria "',categoryName,'" criados com sucesso');

                                categoriesToProcess--;
                                if (categoriesToProcess === 0) {
                                    resolve();
                                }
                            }
                        });   
                    });
                });
            });
        });
    });
}

// TODO - cria tupla <TextoId, Conteudo, Frequencia> onde o Conteudo vêm do arquivo ANNOTATED e a frequencia em que aparece no arquivo
/*
    Criar uma lista com as palavrar encontradas. Cada palavra deverá ter associado a frequencia com que aparece no texto
        Esporte = [ { bola, 33}, { jagador, 102} , ...]
        Policia = [ { assalto, 11}, ...]
        EspaçoDotTrab
        SeuProb
    
        De cada lista obtemos os K primeiro termo (mais frequentes) -- exemplo, com K=50, teremos 200 palavras na nossa bag of words.
*/ 

