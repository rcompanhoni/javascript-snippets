var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

// CONFIGURATION
// ----------------------------------------------------

app.use(bodyParser.json());

var configDB = require('./config/database');
mongoose.connect(configDB.url);

app.use(passport.initialize());

// ROUTES
// ----------------------------------------------------

var router = express.Router();

var authController = require('./controllers/authController');
var resourceController = require('./controllers/resourceController');
var userController = require('./controllers/userController');
var oauth2ClientController = require('./controllers/oauth2ClientController');

// resource
router.post('/resources', authController.isAuthenticated, resourceController.createResource);
router.get('/resources', resourceController.getResources);
router.get('/resources/:resource_id', resourceController.getResourceById);
router.put('/resources/:resource_id', resourceController.updateResource);
router.delete('/resources/:resource_id', resourceController.deleteResource);

// user
router.post('/users', userController.postUsers);
router.get('/users', userController.getUsers);

// oauth 2 client
router.post('/clients', authController.isAuthenticated, oauth2ClientController.postClients);
router.get('/clients', authController.isAuthenticated, oauth2ClientController.getClients);

app.use('/api', router);

// SERVER
// ----------------------------------------------------

app.listen(3000);
console.log("listening at port 3000");