var dgram = require('dgram');
var moment = require('moment');
var fs = require('fs');
var server = dgram.createSocket("udp4");

const PORT = 8124;
const FILEPATH = './server_files/server_';

server.on("message", function(msg, rinfo) {
	//console.log("Mensagem: " + msg + " de " + rinfo.address + ":" + rinfo.port);

  const now = moment().format('DD-MM-YYYY h-mm-ss');
  const path = FILEPATH + now + '.txt';

		fs.writeFile(path, msg.toString(), function(err) {
			if (err)
				console.log("erro ao salvar arquivo");

			console.log("arquivo salvo com sucesso!");
		});
});

server.on('listening', function() {
  var address = server.address();
  console.log('aguardando dados do cliente...');
});

server.bind(PORT);