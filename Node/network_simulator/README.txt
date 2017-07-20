# Network Simulator

Este trabalho consistte na implementação de múltiplas instâncias de dois tipos de programa sendo executado em duas máquinas físicas reais da mesma rede local. Os tipos são:
	* programa-roteador
	* programa-maquina
 
Cada computador deve estar executando instâncias do 'programa-maquina' que representa uma máquina em uma rede. Ao executar o 'programa-maquina' ele deve pedir no console os dados que devem ser informados pelo usuário:

 ------------------------------------------------------------------------------------
MAQUINA 02 EXECUTANDO
    Por favor, informe as informações do destinatário:
        IP:
        Porta:
        Mensagem:
------------------------------------------------------------------------------------
 
Em cada computador, haverá um 'programa-roteador' escutando na porta 5000. Ao executar o programa-roteador ele deve exibir no console as mensagens estão sendo processadas por ele. Exemplo:

------------------------------------------------------------------------------------
ROTEADOR 01 EXECUTANDO 
    ROTEANDO MENSAGEM...
        DE: 192.168.0.3:5002
        PARA: 192.168.0.2:5003
        MENSAGEM: Esta é uma mensagem de MAQUINA 02 para MAQUINA 06    

    ROTEANDO MENSAGEM...
        DE: 192.168.0.3:5002
        PARA: 192.168.0.2:5003
        MENSAGEM: Esta é uma mensagem de MAQUINA 02 para MAQUINA 06    
------------------------------------------------------------------------------------
 
Não será necessário implementar a lógica da montagem das tabelas de roteamento vistas em aula. As tabelas serão 'hard-coded' ou lidas de um arquivo txt. Exemplo:
 
    ROTEADOR 1 (em 192.168.0.3)
        IP HOST    |   PORTA
        localhost  |    5001  (MAQUINA 01)
        localhost  |    5002  (MAQUINA 02)
        localhost  |    5003  (MAQUINA 03)
        192.168.0.2|    5000  (ROTEADOR 02)
 
    ROTEADOR 2 (em 192.168.0.2)
        IP HOST    |   PORTA
        localhost  |    5001 (MAQUINA 04)
        localhost  |    5002 (MAQUINA 05)
        localhost  |    5003 (MAQUINA 06)
        192.168.0.3|    5000 (ROTEADOR 01)
 
Dessa forma, quando uma mensagem for direcionada para um 'programa-maquina' na mesma maquina física então o 'programa-roteador' direcionará diretamente. Quando a mensagem for para a outra máquina então ele direcionará primeiro para o IP:porta do roteador que por sua vez redirecionará a mensagem para o destinatário.


TOPICS COVERED

* UDP server with 'dgram'
* Console interactive menu with 'inquirer'
* Read file line by line with 'fs' and 'readline'
* IP local information with 'ip'
* Sending a JSON as a buffer and then reading it on the client
* Displaying a formatted table with 'console.table'
* Additional command line flags with 'commander'
* Terminate the process with errors: process.exit(1)
* Format JSON data with 'prettyjson'
* Using 'launch.json' with command line arguments