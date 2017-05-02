var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// CONFIGURATION
// ----------------------------------------------------

app.use(bodyParser.json());

var configDB = require('./config/database');
mongoose.connect(configDB.url);

// ROUTES
// ----------------------------------------------------

var routes = require('./routes');
app.use('/api', routes);

// SERVER
// ----------------------------------------------------

app.listen(3000);
console.log("listening at port 3000");