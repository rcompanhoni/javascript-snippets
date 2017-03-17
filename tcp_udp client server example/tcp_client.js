var net = require('net');
var fs = require('fs');

const PORT = 8124;
const FILEPATH = './client_files/client.txt';

var client = new net.Socket();
client.setEncoding('utf8');

// ao conectar com o servidor
client.connect('8124', 'localhost', function(){
	console.log('conectado ao servidor');

    var fileStream = fs.createReadStream(FILEPATH);
    fileStream.on('open',function() {
        fileStream.pipe(client);
    });

    fileStream.on('error', function(err) {
        console.log(err);
    });
});

// ao receber dados
client.on('data', function(data){
	console.log(data);
});

// ao encerrar a conexao
client.on('close', function() {
	console.log('conexao encerrada');
});
