var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');

// CONFIGURATION
// ----------------------------------------------------

// application/x-www-form-urlencoded and JSON
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())                          

// mongoDB
var configDB = require('./config/database');
mongoose.connect(configDB.url);

// passport
app.use(passport.initialize());

// view engine
app.set('view engine', 'ejs');

// use express session support since OAuth2orize requires it
app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

// ROUTES
// ----------------------------------------------------

var router = express.Router();

var authController = require('./controllers/authController');
var resourceController = require('./controllers/resourceController');
var userController = require('./controllers/userController');

var clientController = require('./controllers/clientController');
var oauth2Controller = require('./controllers/oauth2Controller');

// resource
router.post('/resources', authController.isAuthenticated, resourceController.createResource);
router.get('/resources', authController.isAuthenticated, resourceController.getResources);
router.get('/resources/:resource_id', resourceController.getResourceById);
router.put('/resources/:resource_id', resourceController.updateResource);
router.delete('/resources/:resource_id', resourceController.deleteResource);

// user
router.post('/users', userController.postUsers);
router.get('/users', userController.getUsers);

// application client
router.post('/clients', authController.isAuthenticated, clientController.postClients);
router.get('/clients', authController.isAuthenticated, clientController.getClients);

// oauth2 -- authorization grant -- http://localhost:3000/api/oauth2/authorize?response_type=code&client_id=test_application_id_1&redirect_uri=http://localhost:3000&scope=read
router.get('/oauth2/authorize', authController.isAuthenticated, oauth2Controller.authorization);
router.post('/oauth2/authorize', authController.isAuthenticated, oauth2Controller.decision);
router.post('/oauth2/token', authController.isClientAuthenticated, oauth2Controller.token);

app.use('/api', router);
app.listen(3000);
console.log("listening at port 3000");