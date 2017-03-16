var dgram = require('dgram');
var server = dgram.createSocket("udp4");

var PORT = 8124;

server.on("message", function(msg, rinfo){
	console.log("Mensagem: " + msg + " de " + rinfo.address + ":" + rinfo.port);
});

server.on('listening', function() {
  var address = server.address();
  console.log('aguardando dados do cliente...');
});

server.bind(PORT);