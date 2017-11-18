var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var child_process = require('child_process');

var corpusBasePath = path.join(__dirname, 'corpus');
var corpusTTBasePath = path.join(__dirname, 'corpus_pre_TT');
var corpusPostTTBasePath = path.join(__dirname, 'corpus_post_TT');

ProcessCorpusForTT();
RunTreeTagger();
SelectMostRelevantTerms();

function ProcessCorpusForTT() {
    const corpusFiles = fs.readdirSync(corpusBasePath);

    corpusFiles.forEach(corpusFile => {
        // leitura do arquivo
        const readFilePath = path.join(corpusBasePath, corpusFile);
        const buffer = fs.readFileSync(readFilePath);

        // remove diacríticos (i.e. acentos, cedilha)
        var contents = buffer.toString();
        contents = contents.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        // parse do HTML 
        var $ = cheerio.load(contents);
        var parsedHtml = $('body').text().trim();
        
        // gera array de textos (quebra pelo título 'TEXTO 123').
        var texts = parsedHtml.split(/TEXTO\s{0,1}[0-9]+/);

        // cria diretório para a categoria
        const categoryName = corpusFile.split('.')[0];
        const categoryFolderPath = path.join(corpusTTBasePath, categoryName);
        if (!fs.existsSync(categoryFolderPath)) {
            fs.mkdirSync(categoryFolderPath);
        }

        texts.slice(1).map((text, index) => {
            const writeFilePath = path.join(categoryFolderPath, `TEXTO_${index + 1}.txt`);
            const contents = text.trim();

            fs.writeFileSync(writeFilePath, contents);   
        });
    });
}

function RunTreeTagger() {
    const categories = fs.readdirSync(corpusTTBasePath);
    if (categories.length === 0) {
        console.log("Nenhum diretório de categoria encontrado.");
        return;
    }

    categories.map((category) => {
        
        // cria diretório em processed TT
        const categoryFolderPath = path.join(corpusPostTTBasePath, category);
        if (!fs.existsSync(categoryFolderPath)) {
            fs.mkdirSync(categoryFolderPath);
        }

        // processa arquivo 'pré TT' com o Tree Tagger e coloca resultado na pasta 'pós TT'
        let categoryPath = path.join(corpusTTBasePath, category);
        categoryFiles = fs.readdirSync(categoryPath);
        
        // informações sobre o processamento
        let filesToProcess = categoryFiles.length;
        let filesProcessed = 0;

        categoryFiles.map((file) => {
            var sourceFileName = path.join(categoryPath, file);
            var targetFileName = path.join(corpusPostTTBasePath, category, file);
            var command = path.join(__dirname, 'TreeTagger/bin/tag-portuguese') + ' ' +  sourceFileName + ' > ' + targetFileName;

            child_process.execSync(command);

            filesProcessed++;
            console.log("Processando categoria ", category, filesProcessed, "/", filesToProcess, " arquivos processados");
        });
    });
}

/* Criar tupla no formato <Categoria, Texto, Frequencia>. 'Frequencia' é a tupla no seguinte formato:
    <Lema, Frequencia>
    
    Assim, teremos algo como 
        <Esporte, TEXTO_25, [<bola, 12>, <juiz, 15>, <gremio, 33>, ...]
*/

function ProcessCategoryTermFrequency() {

}

