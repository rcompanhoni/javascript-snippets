var net = require('net');
var fs = require('fs');

const PORT = 8124;
const FILEPATH = './client_files/client.txt';

var client = new net.Socket();
client.setEncoding('utf8');

// conectar ao servidor
client.connect('8124', 'localhost', function(){
	console.log('conectado ao servidor');

    var fileStream = fs.createReadStream(FILEPATH);
    fileStream.on('error', function(err) {
        console.log(err);
    });

    fileStream.on('open',function() {
        fileStream.pipe(client);
    });
});

// quando o cliente recebe dados
client.on('data', function(data){
	console.log(data);
});

// quando o servidor encerra a conexao
client.on('close', function(){
	console.log('conexao encerrada');
});
