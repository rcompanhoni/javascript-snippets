var dgram = require('dgram');
var fs = require('fs');

var PORT = 8124;
var HOST = '127.0.0.1';
const FILEPATH = './client_files/client.txt';

var file = fs.readFileSync(FILEPATH); // buffer
var client = dgram.createSocket('udp4');

client.send(file, 0, file.length, PORT, HOST, function (err, bytes) {
    if (err) throw err;
    console.log('Arquivo enviado por UDP para ' + HOST + ':' + PORT);
    client.close();
});