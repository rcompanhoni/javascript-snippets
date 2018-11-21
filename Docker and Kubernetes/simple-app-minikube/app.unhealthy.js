/* after the fifth request it returns a 500 error -- used to demonstrate the pod HTTP liveness probe */

const http = require('http');
const os = require('os');

var requestCount = 0;

var handler = function(request, response) {
    console.log("Received request from " + request.connection.remoteAddress);

    requestCount++;
    if (requestCount > 5) {
        response.writeHead(500);
        response.end("I'm not well. Please restart me!");
        return;
    }

    response.writeHead(200);
    response.end("You've hit " + os.hostname() + "\n");
};

var www = http.createServer(handler);
www.listen(8080);

console.log("Kubia server listening on port 8080...");