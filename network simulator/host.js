var dgram = require('dgram');
var inquirer = require("inquirer");

if (!process.argv[2]) {
    console.log("Informe a porta do host como parâmetro na linha de comando");
} else {

    // SERVER
    //----------------------------------------------------

    var PORT = process.argv[2];
    var server = dgram.createSocket('udp4');
    server.bind(PORT);

    server.on("message", function (msg, rinfo) {
        console.log(msg.toString());
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
                    { value: "table", name: "Exibir tabela de roteamento deste host"},
                    { value: "message", name: "Enviar nova mensagem"},
                ]
            },
        ]

        inquirer.prompt(mainOptions).then(function (answer) {
            switch(answer.selectedOption) {
                case "table":
                    console.log("\nTODO - exibir tabela de roteamento\n\n");
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
                default: 'localhost'
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
            server.send(answers.message, 0, answers.message.length, answers.port, answers.ip, function (err, bytes) {
                if (err) console.error("Não foi possível enviar a mensagem: ", err);

                console.log('Arquivo enviado por UDP para ' + answers.ip + ':' + answers.port + "\n");
                displayDefaultMenu();
            });
        });
    }

    function displayDefaultMenu() {
        console.log("Aguardando mensagens...(pressione qualquer tecla para opções");

        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.once('data', function () {
            displayMainOptions();
        });
    }

    // START
    //----------------------------------------------------

    displayDefaultMenu();
}

