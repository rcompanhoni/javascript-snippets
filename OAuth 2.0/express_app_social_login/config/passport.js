var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');
var configAuth = require('./auth');

module.exports = function (passport) {

    // =========================================================================
    // PASSPORT SESSION SETUP ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // checks if the informed data is valid and not already taken
    passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows passing back the entire request to the callback
    },
    function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    var localUser = req.user || new User();

                    localUser.local.email = email;
                    localUser.local.password = localUser.generateHash(password);

                    localUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, localUser);
                    });
                }
            });
        });
    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // checks if there's a user in db with the informed username password
    passport.use('local-login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

            return done(null, user);
        });
    }));

    //==========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    // facebook will send back the token and profile
    passport.use(new FacebookStrategy(
    {
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'name', 'emails'],
        passReqToCallback: true
    },
    function (req, token, refreshToken, profile, done) {
        process.nextTick(function () {
            if (!req.user) {
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        var email = profile.email || (profile.emails && profile.emails[0].value);
                        if (!email) {
                            return done(null, false, { message: 'This user is missing a Facebook email.' });
                        }

                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.email = email;
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned

                        // save our user to the database
                        newUser.save(function (err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                //  pull the user out of the session and, since it's logged in, we have to link accounts
                var user = req.user; 

                // update user with Facebook credentials if they are currently logged in and stored in session
                user.facebook.id = profile.id;
                user.facebook.token = token;
                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                // save the user
                user.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));

    //==========================================================================
    // TWITTER =================================================================
    //==========================================================================
    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback: true
    },
    function (req, token, tokenSecret, profile, done) {
        process.nextTick(function () {
            if (!req.user) {
                User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.twitter.id = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.username = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                var user = req.user; 
                user.twitter.id = profile.id;
                user.twitter.token = token;
                user.twitter.username = profile.username;
                user.twitter.displayName = profile.displayName;

                user.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy(
    {
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true
    },
    function (req, token, refreshToken, profile, done) {
        process.nextTick(function () {
            if (!req.user) {
                User.findOne({ 'google.id': profile.id }, function (err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();

                        newUser.google.id = profile.id;
                        newUser.google.token = token;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            } else {
                var user = req.user; 
                user.google.id = profile.id;
                user.google.token = token;
                user.google.name = profile.displayName;
                user.google.emai = profile.emails[0].value;

                user.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
        });
    }));
};