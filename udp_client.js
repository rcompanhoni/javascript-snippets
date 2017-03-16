// https://www.hacksparrow.com/node-js-udp-server-and-client-example.html
// http://stackoverflow.com/questions/19705972/buffer-entire-file-in-memory-with-nodejs

var dgram = require('dgram');
var fs = require('fs');

var PORT = 8124;
var HOST = '127.0.0.1';
const FILEPATH = './client_files/client.txt';

var client = dgram.createSocket('udp4');
var fileStream = fs.createReadStream(FILEPATH);

fileStream.on('open',function() {
    client.send(fileStream, 0, PORT, HOST, function(err, bytes) {
        if (err)
            console.log("erro ao enviar arquivo");

        console.log('Datagramas enviados para ' + HOST +':'+ PORT);
        client.close();
    })
});

fileStream.on('error', function(err) {
    console.log("Erro na leitura do arquivo " + err);
});

/*
    var PORT = 33333;
    var HOST = '127.0.0.1';

    var dgram = require('dgram');
    var message = new Buffer('My KungFu is Good!');

    var client = dgram.createSocket('udp4');
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT);
        client.close();
    });
 */