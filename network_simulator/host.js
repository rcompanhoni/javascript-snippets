/******************************************************************************************************************************************************/
/* Specify the port, path to routing table and if is a router:
/*      node host.js -p <PORT> -t <ROUTING_TABLE_PATH> [ -r ]
/*
/******************************************************************************************************************************************************/

var dgram = require('dgram');
var inquirer = require("inquirer");
var fs = require('fs');
var readline = require('readline');
var ipUtil = require('ip');
var program = require('commander');
var prettyjson = require('prettyjson');
require('console.table');

const EOL = require('os').EOL;

// HOST PROPERTIES
//----------------------------------------------------

program
    .option("-p, --port <required>", null)
    .option("-t, --table [optional]", null)
    .option("-r, --router", false)
    .parse(process.argv);

var routes = []; // [{<port, IP>}, {<port, IP>}, {<port, IP>}, ...]
var originIp = ipUtil.address();

var originPort = program.port;
var routesFilePath = program.table;
var isRouter = program.router;

if (!originPort) {
    console.log("Informe a porta do host como parâmetro na linha de comando (parâmetro -p ou --port)");
    process.exit(1);
}

if (!isRouter && !routesFilePath) {
    console.log("Informe o arquivo contendo a tabela de roteamento do host (parâmetro -t ou --table)");
    process.exit(1);
} 
    
if (isRouter) {
    console.log("ROTEADOR INICIADO...");
} else {
    console.log("HOST NA REDE ", originIp);
}

// SERVER
//----------------------------------------------------

var server = dgram.createSocket('udp4');
server.bind(originPort);

server.on("message", function (buffer, rinfo) {
    var package = JSON.parse(buffer.toString());
    console.log(EOL, "RECEBIDO:", EOL);
    console.log(prettyjson.render(package, { keysColor: 'yellow' }), EOL);

    if (isRouter && package.destinyIp != originIp) {
        console.log("ROTEANDO...");

        // TODO: find destinyIp in the router table and get the port
        var isInRoutingTable = routes.find(function (route) {
            return (route.ip == package.destinyIp);
        });

        if (!isInRoutingTable) {
            console.log("Rede informada não foi encontrada")
        } else {
            console.log(prettyjson.render(package, { keysColor: 'yellow' }), EOL);   
            // TODO: send package directly to host in another network
        }
    }

    console.log("Aguardando mensagens...(pressione qualquer tecla para opções adicionais)");
});

// METHODS
//----------------------------------------------------

function displayMainOptions() {
    var mainOptions = [
        {
            type: "list",
            name: "selectedOption",
            message: "Por favor, escolha uma opção:",
            choices: [
                { value: "table", name: "Exibir tabela de roteamento deste host" },
                { value: "message", name: "Enviar nova mensagem" },
            ]
        },
    ];

    inquirer.prompt(mainOptions).then(function (answer) {
        switch (answer.selectedOption) {
            case "table":
                console.table(EOL, routes);
                displayDefaultMenu();
                break;

            case "message":
                displayMessageWizard();
                break;

            default:
                displayDefaultMenu();
        }
    });
}

function displayMessageWizard() {
    var wizardQuestions = [
        {
            type: 'input',
            name: 'ip',
            message: 'Por favor, informe o IP do destinatário:',
            default: originIp
        },
        {
            type: 'input',
            name: 'port',
            message: 'Por favor, informe a porta do destinatário:',
        },
        {
            type: 'input',
            name: 'message',
            message: 'Por favor, informe a mensagem:',
        }
    ]

    inquirer.prompt(wizardQuestions).then(function (answers) {
        var package = {
            originIp: originIp,
            originPort: originPort,
            destinyIp: answers.ip,
            destinyPort: answers.port,
            message: answers.message
        }

        sendMessage(package, displayDefaultMenu)
    });
}

function sendMessage(package, callback) {
    if (originIp == package.destinyIp) {
        // search in the routing table
        var isInRoutingTable = routes.find(function (route) {
            return (route.ip == package.destinyIp && route.port == package.destinyPort);
        });

        if (!isInRoutingTable) {
            console.log("O host informado não consta na tabela de roteamento para a rede local", EOL);
        } else {
            // send package to host in same network
            sendPackage(package, package.destinyPort);
        }
    } else {
        var routerInfo = routes.find(function (route) {
            return route.ip == '0.0.0.0';
        });

        // send package to router
        sendPackage(package, routerInfo.port);
    }

    callback();
}

function displayDefaultMenu() {
    console.log("Aguardando mensagens...(pressione qualquer tecla para opções adicionais)");

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once('data', function () {
        displayMainOptions();
    });
}

function populateRoutingTable() {
    var inputFile = fs.createReadStream(".\\" + routesFilePath);

    const rl = readline.createInterface({
        input: inputFile,
        output: null
    });

    rl.on('line', function (input) {
        var mappingInfo = input.split(",");
        routes.push({
            ip: mappingInfo[0],
            port: mappingInfo[1]
        });
    });
}

function sendPackage(package, port, ip) {
    packageBuffer = new Buffer.from(JSON.stringify(package));
    server.send(packageBuffer, 0, packageBuffer.length, port, originIp, function (err, bytes) {
        if (err) console.error("Não foi possível enviar a mensagem: ", err);

        console.log('Mensagem enviada por UDP para ' + originIp + ':' + port + "\n");
    });
}

// START
//----------------------------------------------------

populateRoutingTable();
displayDefaultMenu();


