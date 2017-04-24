var express = require('express');
var passport = require('passport');

var router = express.Router();

// locally --------------------------------

router.route('/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',   // redirect to the secure profile section
        failureRedirect: '/signup',    // redirect back to the signup page if there is an error
        failureFlash: true             // allow flash messages
    }));

router.route('/login')
    .post(passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

router.route('/connect/local')
    .get(function (req, res) {
        res.render('connect-local.ejs', { message: req.flash('signupMessage') })
    });

router.route('/connect/local')
    .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/connect/local',
        failureFlash: true
    }))

router.route('/unlink/local')
    .get(function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;

        user.save(function (err) {
            res.redirect('/profile');
        });
    });

// facebook (for testing locally use 'localhost' instead of '127.0.0.1') -------------------------------

router.route('/auth/facebook')
    .get(passport.authenticate('facebook', { scope: 'email' }));

router.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }))

router.route('/connect/facebook')
    .get(passport.authenticate('facebook', { scope: 'email' }));

router.route('/connect/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }))

router.route('/unlink/facebook')
    .get(function (req, res) {
        var user            = req.user;
        user.facebook.token = undefined;

        user.save(function(err) {
            res.redirect('/profile');
        });
    });

// twitter (for testing locally use 127.0.0.1 instead of 'localhost') -------------------------------

router.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

router.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }))

router.route('/connect/twitter')
    .get(passport.authorize('twitter', { scope: 'email' }));

router.route('/connect/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }))

router.route('/unlink/twitter')
    .get(function (req, res) {
        var user           = req.user;
        user.twitter.token = undefined;

        user.save(function(err) {
           res.redirect('/profile');
        });
    });

// google (for testing locally use 127.0.0.1 instead of 'localhost') -------------------------------

router.route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }))

router.route('/connect/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/connect/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }))

router.route('/unlink/google')
    .get(function (req, res) {
        var user          = req.user;
        user.google.token = undefined;

        user.save(function(err) {
           res.redirect('/profile');
        });
    });

module.exports = router;