var oauth2orize = require('oauth2orize')
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
var Code = require('../models/code');

// OAUTH 2 SERVER CONFIG
// ----------------------------------------------------
var server = oauth2orize.createServer();

server.serializeClient(function (client, callback) {
    return callback(null, client._id);
});

server.deserializeClient(function (id, callback) {
    Client.findOne({ _id: id }, function (err, client) {
        if (err) { return callback(err); }
        return callback(null, client);
    });
});

// GRANT TYPE: AUTHORIZATION CODE
// ----------------------------------------------------

// generates the authorization code on client approval
server.grant(oauth2orize.grant.code(function (client, redirectUri, user, ares, callback) {
    // create a new authorization code
    var code = new Code({
        value: uid(16),
        clientId: client.clientId,
        redirectUri: redirectUri,
        userId: user._id
    });

    // save the auth code and check for errors
    code.save(function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, code.value);
    });
}));

// exchange authorization code for access token
server.exchange(oauth2orize.exchange.code(function (client, code, redirectUri, callback) {
    Code.findOne({ value: code }, function (err, authCode) {
        if (err) {
            return callback(err);
        }

        if (authCode === undefined) {
            return callback(null, false);
        }

        if (client.clientId.toString() !== authCode.clientId) {
            return callback(null, false);
        }

        if (redirectUri !== authCode.redirectUri) {
            return callback(null, false);
        }

        // delete auth code now that it has been used
        authCode.remove(function (err) {
            if (err) {
                return callback(err);
            }

            // create a new access token
            var token = new Token({
                value: uid(256),
                clientId: authCode.clientId,
                userId: authCode.userId
            });

            // save the access token and check for errors
            token.save(function (err) {
                if (err) {
                    return callback(err);
                }

                callback(null, token);
            });
        });
    });
}));

// user authorization endpoint
exports.authorization = [
    server.authorization(function (clientId, redirectUri, callback) {
        Client.findOne({ clientId: clientId }, function (err, client) {
            if (err) {
                return callback(err);
            }

            return callback(null, client, redirectUri);
        });
    }),
    function (req, res) {
        res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
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


// GRANT TYPE: CLIENT CREDENTIALS
// ----------------------------------------------------
// TODO


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

