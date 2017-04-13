// BASE SETUP
// =============================================================================

var express         = require('express');        
var app             = express();                 
var session         = require('express-session');
var mongoose        = require('mongoose');
var flash           = require('connect-flash');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var passport        = require('passport');

// CONFIGURATION
// ----------------------------------------------------

var configDB        = require('./config/database');
// require('./config/passport')(passport); // pass passport for configuration

mongoose.connect(configDB.url); // object-document Mapper config

app.use(morgan('dev'));         // logs every request to the console
app.use(cookieParser());        // reads cookies (needed for auth)
app.set('view engine', 'ejs');  // sets up ejs for templating

// bodyParser -- enables getting information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// PASSPORT
// ----------------------------------------------------

app.use(session({                                               // persistent login sessions
    secret: 'ilovescotchscotchyscotchscotch',                   // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(flash());                                               // use connect-flash for flash messages stored in session

// ROUTES
// =============================================================================

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// API CONTROLLERS
// ----------------------------------------------------

var resourceController = require('./controllers/resourceController');

// REGISTER ROUTES
// ----------------------------------------------------

app.use('/api', resourceController);

// START THE SERVER
// =============================================================================

var port = process.env.PORT || 3000; 
app.listen(port);
console.log('Listening on port ' + port);