var net = require('net');
var fs = require('fs');
var moment = require('moment')

const PORT = 8124;
const FILEPATH = './server_files/server_';

// cria servidor TCP e vincula eventos a conexão
var server = net.createServer(function(conn) {
	console.log('conectado!');
	
	// recebe o arquivo do cliente em pedaços
	var chunks = [];
	conn.on('data', function(data) {
		console.log('recebendo dados...');
		chunks.push(data);
	});
	
	// ao encerrar o envio cria o arquivo no servidor
	conn.on('close', function() {
		const file = Buffer.concat(chunks);
		const now = moment().format('DD-MM-YYYY h-mm-ss');
		const path = FILEPATH + now + '.txt';

		fs.writeFile(path, file, function(err) {
			if (err)
				console.log("erro ao salvar arquivo");

			console.log("arquivo salvo com sucesso!");
		});

		console.log('conexao com o cliente encerrada');
	});
}).listen(PORT);

// ao começar a conexão
server.on('listening', function() {
	console.log('escutando porta ' + PORT);
});

// tratamento de erros
server.on('error', function(err) {
	if (err.code == 'EADDRINUSE') {
		console.warn('Endereco em uso, tentando novamente...');
		
		setTimeout(function() {
			server.close();
			server.listen(PORT);
		}, 1000)
	}
	else {
		console.log(err);
	}
});