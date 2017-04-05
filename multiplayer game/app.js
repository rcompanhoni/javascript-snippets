var express = require('express');
var app = express();
var serv = require('http').createServer(app);

/*** ROUTES ***/

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
})

app.use('/client', express.static(__dirname + '/client'));


/*** CLASSES AND GLOBAL PROPERTIES ***/

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var Player = function (id) {
    var self = {
        x: 250,
        y: 250,
        id: id,
        number: "" + Math.floor(10 * Math.random()),
        maxSpd: 10,

        // keyboard interactivity properties
        pressingRight: false,
        pressingLeft: false,
        pressingUp: false,
        pressingDown: false,
    }

    self.updatePosition = function () {
        if (self.pressingRight)
            self.x += self.maxSpd;

        if (self.pressingLeft)
            self.x -= self.maxSpd;

        if (self.pressingUp)
            self.y -= self.maxSpd;

        if (self.pressingDown)
            self.y += self.maxSpd;
    }

    return self;
}

/*** SOCKET.IO ***/

var io = require('socket.io')(serv, {});

io.sockets.on('connection', function (socket) {
    // initialize a new socket
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    // initialize the Player
    var player = Player(socket.id);
    PLAYER_LIST[socket.id] = player;

    // clear socket and associated player when disconnected
    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        delete PLAYER_LIST[socket.id];
    })

    // keyboard interactivity event from client
    socket.on('keypress', function (data) {
        if (data.input === 'left')
            player.pressingLeft = data.state;

        else if (data.input === 'right')
            player.pressingRight = data.state;

        else if (data.input === 'up')
            player.pressingUp = data.state;

        else if (data.input === 'down')
            player.pressingDown = data.state;
    });
});

/*** GAME LOOP ***/

setInterval(function () {
    var pack = [];

    // updates players position
    for (var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        player.updatePosition();
        pack.push({
            x: player.x,
            y: player.y,
            number: player.number
        })
    }

    // emits new positions to all sockets
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack);
    }
}, 1000 / 25);


/*** SERVER ***/

app.listen(3000, function () {
    console.log('app listening on port 2000');
});

serv.listen(2000);
