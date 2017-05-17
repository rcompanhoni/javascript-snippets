var mongoose = require('mongoose');
var oauth2orize = require('oauth2orize');
var bcrypt = require('bcrypt-nodejs');

// OAUTH 2 SERVER CONFIG
// ----------------------------------------------------
var server = oauth2orize.createServer();

server.serializeClient(function (client, callback) {
    return callback(null, client._id);
});

server.deserializeClient(function (id, callback) {
    var Client = mongoose.model('Client');

    Client.findOne({ _id: id }, function (err, client) {
        if (err) { return callback(err); }
        return callback(null, client);
    });
});

// GRANT TYPE: RESOURCE OWNER PASSWORD CREDENTIALS
// ----------------------------------------------------

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
    var User = mongoose.model('User');

    User.findOne({username: username}, function (err, user) {
        if (err) return done(err)

        if (!user) return done(null, false)

        bcrypt.compare(password, user.password, function (err, res) {
            if (!res) return done(null, false)

            var Token = mongoose.model('Token');

            var token = new Token({
                value: uid(256),
                clientId: client.clientId,
                userId: user._id
            });
            
           // save the access token and check for errors
            token.save(function (err) {
                if (err) {
                    return callback(err);
                }

                done(null, token);
            });
        })
    })
}))

// client authorization endpoint
exports.authorization = [
    server.authorization(function (clientId, redirectUri, callback) {
        var Client = mongoose.model('Client');

        Client.findOne({ clientId: clientId }, function (err, client) {
            if (err) {
                return callback(err);
            }

            return callback(null, client, redirectUri);
        });
    }),
    function (req, res) {
        res.render('dialog', { 
            transactionID: req.oauth2.transactionID, 
            user: req.user, 
            client: req.oauth2.client 
        });
    }
]

// user decision endpoint -- handles the data submitted by the post and will call the server.grant() created earlier
exports.decision = [
    server.decision()
]

// application client token exchange endpoint -- handle the request made by the application client after they have been granted an authorization code by the user. 
// the server.token() function will initiate a call to the server.exchange() function we created earlier
exports.token = [
    server.token(),
    server.errorHandler()
]

// HELPERS
// ----------------------------------------------------

function uid(len) {
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

