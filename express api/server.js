// BASE SETUP
// =============================================================================

var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require("path");

// CONFIGURATION
// ----------------------------------------------------

var configDB = require('./config/database');
mongoose.connect(configDB.url);

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json())                          // JSON

// uses EJS as the view engine, and serves the views out of a views folder
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());  // reads cookies (needed for auth)
app.use(morgan('dev'));   // logs every request to the console

// PASSPORT
// ----------------------------------------------------

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport); // adds authentication methods to passport object

// CONTROLLERS
// =============================================================================

// API CONTROLLERS
// ----------------------------------------------------

var resourceController = require('./controllers/api/resourceController');

// WEB CONTROLLERS
// ----------------------------------------------------

require('./controllers/web/viewRoutes.js')(app, passport); // load our routes and pass in our app and fully configured passport
var authenticationController = require('./controllers/web/authenticationController');

// REGISTER ROUTES
// ----------------------------------------------------

app.use(authenticationController);
app.use('/api', resourceController);

// START THE SERVER
// =============================================================================

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);