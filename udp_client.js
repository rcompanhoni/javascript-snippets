var dgram = require('dgram');
var fs = require('fs');

var PORT = 8124;
var HOST = '127.0.0.1';
const FILEPATH = './client_files/client.txt';

var client = dgram.createSocket('udp4');
var fileStream = fs.createReadStream(FILEPATH);

fileStream.on('open',function() {
    fileStream.pipe(client);

    client.send(fileStream, PORT, HOST, function(err, bytes) {
        if (err)
            console.log("erro ao enviar arquivo");

        console.log('Datagramas enviados para ' + HOST +':'+ PORT);
        client.close();
    })
});

fileStream.on('error', function(err){
    console.log("Erro na leitura do arquivo " + err);
});