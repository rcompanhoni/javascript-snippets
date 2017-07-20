var express = require('express');
var app = express();
var serv = require('http').createServer(app);

var profiler = require('v8-profiler');
var fs = require('fs');

// var mongojs = require("mongojs");
// var db = mongojs('localhost:27017/myGame', ['account', 'progress']);

require('./Entity');
require('./client/Inventory');

// ROUTES
//=============================================================================

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
})

app.use('/client', express.static(__dirname + '/client'));

// GLOBAL
//=============================================================================

var DEBUG = true; // flag for 'evalServer' messages
SOCKET_LIST = {};

// AUTHENTICATION
//----------------------------------------------------

var isValidPassword = function (data, callback) {
    return callback(true);

    // db.account.find({ username: data.username, password: data.password }, function (err, result) {
    //     if (result.length > 0)
    //         callback(true)
    //     else
    //         callback(false)
    // })
}

var isUsernameTaken = function (data, callback) {
    return callback(false);

    // db.account.find({ username: data.username }, function (err, result) {
    //     if (result.length > 0)
    //         callback(true)
    //     else
    //         callback(false)
    // })
}

var addUser = function (data, callback) {
    return callback();

    // db.account.insert({ username: data.username, password: data.password }, function (err) {
    //     callback(true)
    // })
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
        isValidPassword(data, function (result) {
            if (result) {
                Player.onConnect(socket, data.username);
                socket.emit('signInResponse', { success: true });
            } else {
                socket.emit('signInResponse', { success: false });
            }
        })
    });

    socket.on('signUp', function (data) {
        isUsernameTaken(data, function (result) {
            if (result) {
                socket.emit('signUpResponse', { success: false });
            } else {
                addUser(data, function () {
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

// send players/bullets three objects at every 1000/25 cycle
setInterval(function () {
    var packs = Entity.getFrameUpdateData();

    // broadcast to all sockets
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('init', packs.initPack);        // data for initialize new players/bullets
        socket.emit('update', packs.updatePack);    // data for updating existing players/bullets
        socket.emit('remove', packs.removePack);    // data for removing players/bullets
    }
}, 1000 / 25);

// SERVER
//=============================================================================

// PROFILER
//----------------------------------------------------

var startProfiling = function(duration) {
    profiler.startProfiling('1', true);

    setTimeout(function() {
        var profile1 = profiler.stopProfiling('1');

        profile1.export(function(error, result) {
            fs.writeFile('./profile.cpuprofile', result);
            profile1.delete();
            console.log("Profile saved");
        });
    }, duration);
}

startProfiling(10000);

// INITIALIZATION
//----------------------------------------------------
var port = process.env.PORT || 2000;
serv.listen(port);
console.log("App escutando na porta " + port);
