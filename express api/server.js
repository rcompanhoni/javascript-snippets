// BASE SETUP
// =============================================================================

var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

// configure app to use bodyParser() -- this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MONGOOSE
// ----------------------------------------------------

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/adocoesDb');

// ROUTES
// =============================================================================

var router = express.Router();              

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Processando requisição');
    next(); 
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API Adoções' });   
});

var abrigoController = require('./controllers/abrigoController');

// REGISTER ROUTES
// ----------------------------------------------------

app.use('/api', router);
app.use('/api', abrigoController);

// START THE SERVER
// =============================================================================

var port = process.env.PORT || 3000; 
app.listen(port);
console.log('Magic happens on port ' + port);