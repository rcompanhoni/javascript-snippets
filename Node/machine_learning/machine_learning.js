const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const child_process = require('child_process');
const _ = require('lodash');

// paths para os diretórios
const corpusBasePath = path.join(__dirname, 'corpus');
const corpusTTBasePath = path.join(__dirname, 'corpus_pre_TT');
const corpusPostTTBasePath = path.join(__dirname, 'corpus_post_TT');
const wekaBasePath = path.join(__dirname, 'weka');

// ATENÇÃO! este array é preenchido em 'ProcessCorpusForTT', deixe-o em branco caso o programa esteja rodando todas as etapas
// let categoryNames = [];
let categoryNames =  ['espaco_trabalhador', 'esportes', 'policia', 'seu_problema_e_nosso']; 

const relevantTags = [
    'VERB',     // verbo 
    'NOUN',     // substantivo
    'PROPN',    // nome próprio
    'ADJ',      // adjetivo
    'ADV',      // advérbio
    'ADP',      // preposição
];

const nGramSize = 3;        // quantidade de n-gramas a gerar
let frequencyInfo = [];     // n-gramas de cada arquivo
let bagOfWords = {};        // dicionário de n-gramas completo para cada categoria

const nGreatest = 120;       // quantidade de termos mais frequentes a utilizar
let mostFrequent = {};      // dicionário de n-gramas mais frequentes para cada categoria

// ProcessCorpusForTT();
// RunTreeTagger();
ProcessCategoryTermFrequency();
GenerateBagOfWords();
GenerateWekaFiles();

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

        // remove quaisquer outras tags presentes
        // parsedHtml = parsedHtml.replace(/<\/?[^>]+(>|$)/g, "");

        // gera array de textos (quebra pelo título 'TEXTO 123').
        var texts = parsedHtml.split(/TEXTO\s{0,1}[0-9]+/);

        // cria diretório para a categoria
        const categoryName = corpusFile.split('.')[0];
        categoryNames.push(categoryName);
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

function ProcessCategoryTermFrequency() {
    const categories = fs.readdirSync(corpusPostTTBasePath);

    if (categories.length === 0) {
        console.log("Nenhum diretório de categoria encontrado.");
        return;
    }

    // processa todos os arquivos anotados de cada diretório de categoria
    categories.map((category) => {
        let categoryPath = path.join(corpusPostTTBasePath, category);
        categoryFiles = fs.readdirSync(categoryPath);

        // para cada arquivo...
        categoryFiles.map((fileName) => {
            let fileFrequencyInfo = { category, fileName, nGrams: [] };

            const filePath = path.join(categoryPath, fileName);
            const buffer = fs.readFileSync(filePath);
            
            // obtém todos os termos relevantes do arquivo anotado
            const lines = buffer.toString().trim().split('\n');
            const fileTerms = lines.reduce((terms, line) => {
                const parts = line.split("\t");
                
                if (parts.length === 3) {
                    // obtém informações do termo (palavra original, lema e classe gramatical)
                    const token = parts[0];
                    const lemma = parts[2].split('\r')[0];
                    let tag = parts[1];
                    
                    if (tag.indexOf('_') > 0) {
                        tag = tag.split('_')[0];
                    }
    
                    if (tag.indexOf('.') > 0) {
                        tag = tag.split('.')[0];
                    }
    
                    // filtra por tipos relevantes
                    if (lemma !== '<unknown>' && relevantTags.some(relevantTag => tag === relevantTag)) {
                        terms.push({ token, tag, lemma });
                    }
                }

                return terms;
            }, []);

            // monta os k n-gramas do texto e adiciona à lista global de n-gramas 
            for (let n = 1; n <= nGramSize; n++) {
                let nGram = {};

                // exclui preposições para n-gramas de tamanho 1
                if (n === 1) {
                    const relevantForN1 = relevantTags.filter(tag => tag !== 'ADP');
                    const fileTermsForN1 = fileTerms.filter(term => relevantForN1.some(relevantTag => relevantTag === term.tag));

                    fileTermsForN1.map((term) => {
                        nGram[term.lemma] = ((nGram[term.lemma] || 0) + 1);
                    });
                } else {
                    // desloca os termos para geração do n-grama
                    let shiftedFileTermsArray = [];
                    let shiftedFileTerms = fileTerms.slice(0);
                    for (let shift = 0; shift < (n - 1); shift++) {
                        shiftedFileTerms.shift();
                        shiftedFileTermsArray.push(shiftedFileTerms.slice(0));    
                    }

                    // concatena lemas dos arrays de termos (original + deslocados)
                    nGram = fileTerms.reduce((aggregation, term, index) => {
                        if (shiftedFileTermsArray.every(shiftedArray => shiftedArray[index])) {
                            const shiftedLemmas = shiftedFileTermsArray.reduce((lemmas, shiftedArray) => { 
                                lemmas.push(shiftedArray[index].lemma);
                                return lemmas; 
                            }, []);

                            const key = `${fileTerms[index].lemma} ${shiftedLemmas.join(' ')}`;
                            aggregation[key] = ((nGram[key] || 0) + 1);
                        }

                        return aggregation;
                    }, {});
                }

                fileFrequencyInfo.nGrams.push(nGram);
            }

            frequencyInfo.push(fileFrequencyInfo);
        });
    });
}

function GenerateBagOfWords() {
    // inicializa entradas para cada categoria
    categoryNames.forEach(category => { 
        bagOfWords[category] = [] 

        for (let n = 0; n < nGramSize; n++) {
            bagOfWords[category][n] = {};
        }
    }); 

    // agrega os n-gramas de cada categoria
    frequencyInfo.forEach((fileInfo) => {
        for (let n = 0; n < nGramSize; n++) {
            Object.keys(fileInfo.nGrams[n]).map((lemma) => {
                const currentBagOfWords = bagOfWords[fileInfo.category][n];
                const lemmaCount = fileInfo.nGrams[n][lemma];
                currentBagOfWords[lemma] = ((currentBagOfWords[lemma] || 0) + lemmaCount);
            });
        }

    });
    
    // mantém os k-primeiros mais frequentes
    categoryNames.forEach(category => {
        mostFrequent[category] = [];
        const result = bagOfWords[category].map((categoryBow) => {
            var lemmaArray = Object.keys(categoryBow).map(function(key) {
                return [key, categoryBow[key]];
            });
    
            lemmaArray.sort(function(first, second) {
                return second[1] - first[1];
            });

            const sliced = lemmaArray.slice(0, nGreatest); 
            mostFrequent[category].push(sliced);
        });
    });
}

function GenerateWekaFiles() {
    let combinedNGrams = {};

    // combina n-gramas removendo termos duplicados
    for (let n = 0; n < nGramSize; n++) {
        categoryNames.forEach((category) => {
            const categoryNGrams = mostFrequent[category];
            const lemmas = categoryNGrams[n].map(term => term[0])
            combinedNGrams[`NGRAMA${n+1}`] = combinedNGrams[`NGRAMA${n+1}`] ? _.union(combinedNGrams[`NGRAMA${n+1}`], lemmas) : lemmas;
        });
    };

    for (let n = 0; n < nGramSize; n++) {
        const relationName = `NGRAMA${n+1}`;
        const globalNGrams = combinedNGrams[relationName];

        let frequencyInfoForTraining = [];
        let frequencyInfoForTesting = [];

        let dataLines = [];
        
        frequencyInfo.forEach((fileFrequencyInfo) => {
            const fileNGrams = Object.keys(fileFrequencyInfo.nGrams[n]);
            let dataLine = "";
    
            globalNGrams.forEach((term) => {
                if (fileNGrams.indexOf(term) >= 0) {
                    dataLine += " 1"
                } else {
                    dataLine += " 0"
                }
            });
    
            dataLine += ` ${fileFrequencyInfo.category}\n`;
            dataLines.push(dataLine);
        });

        // determina porcentagem de datalines para treinamento (80%) e teste (20%)
        const totalCount = dataLines.length;
        const forTrainingCount = Math.floor(totalCount * 0.8);

        shuffledDataLines = _.shuffle(dataLines)
        dataLinesForTraining = shuffledDataLines.slice(0, forTrainingCount);
        dataLinesForTesting = shuffledDataLines.slice(forTrainingCount + 1);

        WriteToDisc(n, dataLines, globalNGrams, relationName, 'full');                  // 100 % da bag of words para para o N-GRAMA N 
        WriteToDisc(n, dataLinesForTraining, globalNGrams, relationName, 'training');   // 80% da bag of words para para o N-GRAMA N
        WriteToDisc(n, dataLinesForTesting, globalNGrams, relationName, 'testing');     // 20% da bag of words para para o N-GRAMA N
    }; 
    
    function WriteToDisc(n, dataLines, globalNGrams, relationName, targetFolder) {
        // monta conteúdo do arquivo
        let weka = `@RELATION N-GRAMA-${n+1}\n\n`;
    
        globalNGrams.forEach((attribute) => {
            weka += `@ATTRIBUTE '${attribute}'\tINTEGER\n`;
        });
    
        weka += `@ATTRIBUTE class {`
        categoryNames.forEach((category) => {
            weka += `${category} `;
        });
        weka += `}\n\n`;
    
        weka += `@DATA\n`;
        dataLines.forEach((line) => {
            const trimmedLine = line.trim();
            weka += `${trimmedLine}\n`;
        });
    
        if (!fs.existsSync(wekaBasePath)) {
            fs.mkdirSync(wekaBasePath);
        }
    
        const targetFolderPath = path.join(wekaBasePath, targetFolder);
        if (!fs.existsSync(targetFolderPath)) {
            fs.mkdirSync(targetFolderPath);
        }
    
        const newWekafilePath = path.join(targetFolderPath, `${relationName}.arff`);
        fs.writeFileSync(newWekafilePath, weka); 
    }
}



