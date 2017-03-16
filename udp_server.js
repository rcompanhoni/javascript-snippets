var dgram = require('dgram');
var moment = require('moment');
var fs = require('fs');

// dgram.createSocket() can either accept 'udp4' or 'udp6'. The former uses IPv4,
var server = dgram.createSocket("udp4");

const PORT = 8124;
const FILEPATH = './server_files/server_';

// the message event is fired, when a UDP packet arrives destined for this server.
server.on("message", function(msg, rinfo) {
  const now = moment().format('DD-MM-YYYY h-mm-ss');
  const path = FILEPATH + now + '_UDP.txt';

		fs.writeFile(path, msg.toString(), function(err) {
			if (err)
				console.log("erro ao salvar arquivo");

			console.log("arquivo salvo com sucesso!");
		});
});

// the listening event is fired, when the server has initialized and all ready to receive UDP packets.
server.on('listening', function() {
  var address = server.address();
  console.log('aguardando dados do cliente...');
});

server.bind(PORT);

/*
    var PORT = 33333;
    var HOST = '127.0.0.1';

    var dgram = require('dgram');
    var server = dgram.createSocket('udp4');

    server.on('listening', function () {
        var address = server.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    });

    server.on('message', function (message, remote) {
        console.log(remote.address + ':' + remote.port +' - ' + message);

    });

    server.bind(PORT, HOST);
 */