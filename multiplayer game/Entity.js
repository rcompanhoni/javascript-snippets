// GLOBAL
//=============================================================================

var initPack = { player: [], bullet: [] };
var removePack = { player: [], bullet: [] };

// ENTITY - base class for every entity on the game
//----------------------------------------------------

Entity = function (param) {
    var self = {
        x: param.x || 250,
        y: param.y || 250,
        spdX: param.spdX || 0,
        spdY: param.spdY || 0,
        id: param.id || "",
        map: param.map || 'forest'
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

// ENTITY - STATIC
//----------------------------------------------------

Entity.getFrameUpdateData = function () {
    var packs = {
        initPack: {
            player: initPack.player,
            bullet: initPack.bullet
        },
        removePack: {
            player: removePack.player,
            bullet: removePack.bullet
        },
        updatePack: {
            player: Player.update(),
            bullet: Bullet.update()
        }
    };

    // clear for next iteration
    packs.initPack.player = [];
    packs.initPack.bullet = [];
    packs.removePack.player = [];
    packs.removePack.bullet = [];

    return packs;
}

// PLAYER
//----------------------------------------------------

Player = function (param) {
    var self = Entity(param);
    self.username = param.username;
    self.number = "" + Math.floor(10 * Math.random());
    self.maxSpd = 10;
    self.hp = 10;
    self.hpMax = 10;
    self.score = 0;
    self.inventory = new Inventory(param.socket);

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
            // for (var i = -3; i < 3; i++)
            //     self.shootBullet(i * 10 + self.mouseAngle);

            // single shot
            self.shootBullet(self.mouseAngle);
        }
    }

    self.shootBullet = function (angle) {
        Bullet({
            parent: self.id,
            angle: angle,
            x: self.x,
            y: self.y,
            map: self.map
        });
    }

    self.updateSpd = function () {
        if (self.pressingRight && self.spdX < self.maxSpd)
            self.spdX += self.maxSpd;
        else if (self.pressingLeft && self.spdX >= 0)
            self.spdX -= self.maxSpd;
        else
            self.spdX = 0;

        if (self.pressingUp && self.spdY >= 0)
            self.spdY -= self.maxSpd;
        else if (self.pressingDown && self.spdY < self.maxSpd)
            self.spdY += self.maxSpd;
        else
            self.spdY = 0;
    }

    self.getInitPack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            number: self.number,
            hp: self.hp,
            hpMax: self.hpMax,
            score: self.score,
            map: self.map
        };
    }

    self.getUpdatePack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            hp: self.hp,
            score: self.score,
            map: self.map
        };
    }

    // adds itself to the static list and initial package array (to update the clients)
    Player.list[self.id] = self;
    initPack.player.push(self.getInitPack());

    return self;
}

// PLAYER - STATIC
//----------------------------------------------------

Player.list = {};

Player.onConnect = function (socket, username) {
    // random map
    var map = Math.random() < 0.5 ? 'field' : 'forest';
    var player = Player({
        id: socket.id,
        username: username,
        map: map,
        socket: socket,
    });

    // keyboard interactivity event handler
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

    // change map request
    socket.on('changeMap', function () {
        if (player.map == 'field') {
            player.map = 'forest';
        } else {
            player.map = 'field';
        }
    });

    // broadcast an init pack when a new player is created
    socket.emit('init', {
        selfId: socket.id,
        player: Player.getAllInitPack(),
        bullet: Bullet.getAllInitPack()
    });

    // broadcast a chat message to all sockets
    socket.on('sendMsgToServer', function (data) {
        for (var i in SOCKET_LIST) {
            SOCKET_LIST[i].emit('addToChat', player.username + ": " + data);
        }
    });

    // send private chat message
    socket.on('sendPmToServer', function (data) {
        var recipientSocket = null;

        for (var i in Player.list) {
            if (Player.list[i].username == data.username) {
                recipientSocket = SOCKET_LIST[i];
            }
        }

        // if recipient doesn't exists, notify the original sender -- otherwise sent to recipient
        if (recipientSocket === null) {
            socket.emit('addToChat', 'The player ' + data.username + ' is not online');
        } else {
            socket.emit('addToChat', 'To: ' + data.username + ": " + data.message);
            recipientSocket.emit('addToChat', 'From: ' + player.username + ": " + data.message);
        }
    });
}

Player.getAllInitPack = function () {
    var players = [];
    for (var i in Player.list) {
        players.push(Player.list[i].getInitPack());
    }

    return players;
}

Player.onDisconnect = function (socket) {
    delete Player.list[socket.id];
    removePack.player.push(socket.id);
}

Player.update = function () {
    var pack = [];

    // updates players position
    for (var i in Player.list) {
        var player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }

    return pack;
}

// BULLET
//----------------------------------------------------

Bullet = function (param) {
    var self = Entity(param);

    self.id = Math.random();
    self.parent = param.parent;

    self.angle = param.angle;
    self.spdX = Math.cos(param.angle / 180 * Math.PI) * 10;
    self.spdY = Math.sin(param.angle / 180 * Math.PI) * 10;
    self.timer = 0;
    self.toRemove = false;

    var super_update = self.update;

    self.update = function () {
        if (self.timer++ > 100) {
            self.toRemove = true;
        }

        super_update();

        // collision
        for (var i in Player.list) {
            var player = Player.list[i];
            if (self.map === player.map && self.getDistance(player) < 32 && self.parent !== player.id) {
                // damage inflicted on player
                player.hp -= 1;

                //if died, respawn and increase shooter score
                if (player.hp <= 0) {
                    player.hp = player.hpMax;
                    player.x = Math.random() * 500;
                    player.y = Math.random() * 500;

                    var shooter = Player.list[self.parent];
                    if (shooter) {
                        shooter.score += 1;
                    }
                }

                self.toRemove = true;
            }
        }
    }

    self.getInitPack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y,
            map: self.map
        };
    }

    self.getUpdatePack = function () {
        return {
            id: self.id,
            x: self.x,
            y: self.y
        };
    }

    // adds itself to the static list and initial package array (to update the clients)
    Bullet.list[self.id] = self;
    initPack.bullet.push(self.getInitPack());

    return self;
}

// BULLET - STATIC
//----------------------------------------------------

Bullet.list = {};

Bullet.getAllInitPack = function () {
    var bullets = [];
    for (var i in Bullet.list) {
        bullets.push(Bullet.list[i].getInitPack());
    }

    return bullets;
}

Bullet.update = function () {
    var pack = [];

    for (var i in Bullet.list) {
        var bullet = Bullet.list[i];
        bullet.update();

        if (bullet.toRemove) {
            // delete static list and adds it to removed pack (for updating clients)
            delete Bullet.list[i];
            removePack.bullet.push(bullet.id);

        } else {
            pack.push(bullet.getUpdatePack());
        }
    }

    return pack;
}

