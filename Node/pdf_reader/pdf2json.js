const fs = require('fs');
const PDFParser = require("pdf2json");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));

pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("./calendar.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("./calendar.pdf");