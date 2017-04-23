var express = require('express');
var passport = require('passport');

var router = express.Router();

router.route('/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect : '/profile',   // redirect to the secure profile section
        failureRedirect : '/signup',    // redirect back to the signup page if there is an error
        failureFlash : true             // allow flash messages
    }));

router.route('/login')
    .post(passport.authenticate('local-login', {
        successRedirect : '/profile',   
        failureRedirect : '/login',    
        failureFlash : true             
    }));

// =====================================
// FACEBOOK ROUTES =====================
// =====================================

// route for facebook authentication and login
router.route('/auth/facebook')
    .get(passport.authenticate('facebook', { scope : 'email' }));


// handle the callback after facebook has authenticated the user
router.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    }))

// =====================================
// TWITTER ROUTES ======================
// =====================================
// For testing locally use 127.0.0.1 instead of 'localhost'

router.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

router.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    }))

module.exports = router;