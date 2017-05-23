var dgram = require('dgram');
var moment = require('moment');
var fs = require('fs');
 
var server = dgram.createSocket("udp4");

const PORT = 8124;
const DIR = './server_files';
const FILEPATH = DIR + '/server_';

// disparado quando um pacote UDP chega neste servidor
server.on("message", function (msg, rinfo) {
    if (!fs.existsSync(DIR)) {
        fs.mkdirSync(DIR);
    }

    const now = moment().format('DD-MM-YYYY h-mm-ss');
    const path = FILEPATH + now + '_UDP.txt';

    fs.writeFile(path, msg, function (err) {
        if (err)
            console.log("erro ao salvar arquivo");

        console.log("arquivo salvo com sucesso!");
    });
});

// quando o servidor for inicializado e estiver pronto para receber pacotes UDP
server.on('listening', function () {
    var address = server.address();
    console.log('aguardando dados do cliente...');
});

server.bind(PORT);