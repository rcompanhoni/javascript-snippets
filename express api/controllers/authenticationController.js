var express = require('express');
var passport = require('passport');

var router = express.Router();

router.route('/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect : '/profile',   // redirect to the secure profile section
        failureRedirect : '/signup',    // redirect back to the signup page if there is an error
        failureFlash : true             // allow flash messages
    }));

module.exports = router;