var express = require('express');
var app = express();
var serv = require('http').createServer(app);

var mongojs = require("mongojs");
var db = mongojs('localhost:27017/myGame', ['account', 'progress']);

// ROUTES
//=============================================================================

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
})

app.use('/client', express.static(__dirname + '/client'));


// GLOBAL
//=============================================================================

var DEBUG = true; // flag for 'evalServer' messages
var SOCKET_LIST = {};

// AUTHENTICATION
//----------------------------------------------------

var USERS = {
    "rafael": "123",
    "rafael2": "234",
}

var isValidPassword = function (data, callback) {
    db.account.find({ username: data.username, password: data.password }, function (err, result) {
        if (result.length > 0)
            callback(true)
        else
            callback(false)
    })
}

var isUsernameTaken = function (data, callback) {
     db.account.find({ username: data.username }, function (err, result) {
        if (result.length > 0)
            callback(true)
        else
            callback(false)
    })
}

var addUser = function (data, callback) {
    db.account.insert({ username: data.username, password: data.password }, function (err) {
        callback(true)
    })
}

// CLASSES
//=============================================================================

// base class for every entity on the game
var Entity = function () {
    var self = {
        x: 250,
        y: 250,
        spdX: 0,
        spdY: 0,
        id: ""
    }

    self.update = function () {
        self.updatePosition();
    }

    self.updatePosition = function () {
        self.x += self.spdX;
        self.y += self.spdY;
    }

    // distance from a given entity
    self.getDistance = function (entity) {
        return Math.sqrt(Math.pow(self.x - entity.x, 2) + Math.pow(self.y - entity.y, 2));
    }

    return self;
};

// PLAYER
//----------------------------------------------------

var Player = function (id) {
    var self = Entity();
    self.id = id;
    self.number = "" + Math.floor(10 * Math.random());
    self.maxSpd = 10;

    // keyboard -- movement
    self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;

    // keyboard -- action
    self.pressingAttack = false;
    self.mouseAngle = 0;

    // execute its own update and then invoke superclass update function
    // modifies the speed and then updates the position accordingly
    var super_update = self.update;
    self.update = function () {
        self.updateSpd();
        super_update();

        // generates random bullets at the players position
        if (self.pressingAttack) {
            // TODO - extra, special spread of bullets 
            for (var i = -3; i < 3; i++)
                self.shootBullet(i * 10 + self.mouseAngle);

            // single shot
            //self.shootBullet(self.mouseAngle);
        }
    }

    self.shootBullet = function (angle) {
        var bullet = Bullet(self.id, angle);
        bullet.x = self.x;
        bullet.y = self.y;
    }

    self.updateSpd = function () {
        if (self.pressingRight)
            self.spdX += self.maxSpd;
        else if (self.pressingLeft)
            self.spdX -= self.maxSpd;
        else
            self.spdX = 0;

        if (self.pressingUp)
            self.spdY -= self.maxSpd;
        else if (self.pressingDown)
            self.spdY += self.maxSpd;
        else
            self.spdY = 0;
    }

    Player.list[id] = self;
    return self;
}

// PLAYER - STATIC
//----------------------------------------------------

Player.list = {};

Player.onConnect = function (socket) {
    var player = Player(socket.id);

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

        else if (data.input === 'attack')
            player.pressingAttack = data.state;

        else if (data.input === 'mouseAngle')
            player.mouseAngle = data.state;
    });
}

Player.onDisconnect = function (socket) {
    delete Player.list[socket.id];
}

Player.update = function () {
    var pack = [];

    // updates players position
    for (var i in Player.list) {
        var player = Player.list[i];
        player.update();
        pack.push({
            x: player.x,
            y: player.y,
            number: player.number
        })
    }

    return pack;
}

// BULLET
//----------------------------------------------------

var Bullet = function (parent, angle) {
    var self = Entity();

    self.id = Math.random();
    self.parent = parent;
    self.spdX = Math.cos(angle / 180 * Math.PI) * 10;
    self.spdY = Math.sin(angle / 180 * Math.PI) * 10;
    self.timer = 0;
    self.toRemove = false;

    var super_update = self.update;
    self.update = function () {
        if (self.timer++ > 100) {
            self.toRemove = true;
        }

        super_update();

        // checks if bullet collided another player
        for (var i in Player.list) {
            var p = Player.list[i];
            if (self.getDistance(p) < 32 && self.parent !== p.id) {
                // TODO - handle collision 
                self.toRemove = true;
            }
        }
    }

    Bullet.list[self.id] = self;
    return self;
}

// BULLET - STATIC
//----------------------------------------------------

Bullet.list = {};

Bullet.update = function () {
    var pack = [];

    for (var i in Bullet.list) {
        var bullet = Bullet.list[i];
        bullet.update();

        if (bullet.toRemove) {
            delete Bullet.list[i];
        } else {
            pack.push({
                x: bullet.x,
                y: bullet.y
            })
        }
    }

    return pack;
}

// SOCKET.IO
//=============================================================================

var io = require('socket.io')(serv, {});

io.sockets.on('connection', function (socket) {
    // initialize a new socket
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    // creates the player when signed id successfully
    socket.on('signIn', function (data) {
        isValidPassword(data, function(result) {
            if (result) {
                Player.onConnect(socket);
                socket.emit('signInResponse', { success: true });    
            } else {
                socket.emit('signInResponse', { success: false });
            }
        })
    });

    socket.on('signUp', function (data) {
        isUsernameTaken(data, function(result) {
            if (result) {
               socket.emit('signUpResponse', { success: false });
            } else {
                addUser(data, function(){ 
                    socket.emit('signUpResponse', { success: true });
                })
            }
        })
    });

    // clear socket and associated player when disconnected
    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
    });

    // broadcast the chat message to all sockets
    socket.on('sendMsgToServer', function (data) {
        var playerName = ("" + socket.id).slice(2, 7);

        for (var i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', playerName + ": " + data);
        }
    });

    // CAUTION: evals expression from client chat -- must deactivate when on production
    socket.on('evalServer', function (data) {
        if (!DEBUG)
            return;

        var res = eval(data);
        socket.emit('evalAnswer', res);
    });
});

// GAME LOOP
//=============================================================================

setInterval(function () {
    // pack contains arrays of data to inform the clients
    var pack = {
        player: Player.update(),
        bullet: Bullet.update()
    }

    // broadcast player position to all sockets
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack);
    }
}, 1000 / 25);


// SERVER
//=============================================================================

app.listen(3000, function () {
    console.log('app listening on port 2000');
});

serv.listen(2000);
