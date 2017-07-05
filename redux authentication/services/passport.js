const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt =  require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// setup options for Local Strategy
const localOptions = { usernameField: 'email' };

// create local strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // verify this username and password are valid
    User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false) }

        // check if password is valid -- encrypt the informed password and compare it to the current user's encrypted password
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false) }

            return done(null, user);
        });
    })
})

// setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // specifies that the JWT should be extracted from the request 'authorization' header
    secretOrKey: config.secret
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // verify that the user ID (property 'sub' in the JWT) in the payload exists in the DB
    User.findById(payload.sub, function(err,user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);   // user found
        } else {
            done(null, false); // user not found
        }
    });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
