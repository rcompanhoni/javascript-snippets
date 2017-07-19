// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    
    res.redirect('/');
}

module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        var errorMessage = (req.session && req.session.flash && req.session.flash.error)  ? req.session.flash.error[0] : null;
        res.render('index.ejs', { message: errorMessage }); 
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // middleware added to check if authenticated -- if it is, then get the user out of the session and pass to template
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });
};

