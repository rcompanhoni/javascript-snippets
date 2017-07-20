var passport = require('passport');

var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy

var Token = require('../models/token');
var User = require('../models/user');
var Client = require('../models/client');

// basic strategy for authenticate users 
passport.use(new BasicStrategy(function (username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return callback(err);
        }

        // no user found with that username
        if (!user) {
            return callback(null, false);
        }

        // make sure the password is correct
        user.verifyPassword(password, function (err, isMatch) {
            if (err) {
                return callback(err);
            }

            // password did not match
            if (!isMatch) {
                return callback(null, false);
            }

            // success
            return callback(null, user);
        });
    });
}));

// basic strategy for authenticate oauth2 clients 
passport.use('client-basic', new BasicStrategy(
    function (username, password, callback) {
        Client.findOne({ clientId: username }, function (err, client) {
            if (err) {
                return callback(err);
            }

            // no client found with that id or bad password
            if (!client || client.secret !== password) {
                return callback(null, false);
            }

            // success
            return callback(null, client);
        });
    }
));

// bearer strategy for authenticate oauth2 tokens
passport.use(new BearerStrategy(
    function (accessToken, callback) {
        Token.findOne({ value: accessToken }, function (err, token) {
            if (err) { 
                return callback(err); 
            }

            // no token found
            if (!token) { 
                return callback(null, false); 
            }

            User.findOne({ _id: token.userId }, function (err, user) {
                if (err) { 
                    return callback(err); 
                }

                // no user found
                if (!user) { 
                    return callback(null, false); 
                }

                // simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));

// The option of session being set to false tells passport to not store session variables between calls to our API. 
// This forces the user to submit the username and password on each call.
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });

