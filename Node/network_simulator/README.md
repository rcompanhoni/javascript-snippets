# Network simulator

This is and client-server application which consists of two main elements:

* **program-router**
* **program-machine**

The idea is to run one program-router and a set of program-machine instances in a real machine and another program-router and program-machine set in another real machine (the real machines must be in the same real local network). When executing a program-machine it will display a simple menu that allows messages (packages) to be sent to another program-machine.

```
MACHINE 02 RUNNING
    Please, inform target machine information:
        IP:
        Port:
        Message:
```

On each real computer, there will be a 'program-router' listening for messages. When running the program-router it displays in the console the messages that are being currently routed. Example:

```
ROUTER 01 RUNNING

ROUTING MESSAGE...
        FROM: 192.168.0.3:5002
        TO: 192.168.0.2:5003
        MESSAGE: This is a message from MACHINE 02 to MACHINE 06

ROUTING MESSAGE
        FROM: 192.168.0.3:5002
        TO: 192.168.0.2:5003
        MESSAGE: This is a message from MACHINE 02 to MAHCINE 05
```

Thus, when a message is directed to a 'program-machine' on the same physical machine then the 'program-router' will route it directly. When the message goes to the other real machine then it will first route to its corresponding program-router which in turn redirects the message to the real destination.

### PACKAGES USED

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
