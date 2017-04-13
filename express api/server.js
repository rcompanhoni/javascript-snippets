// BASE SETUP
// =============================================================================

var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

// allows using data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MONGOOSE
// ----------------------------------------------------

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/expressExampleDb');

// ROUTES
// =============================================================================

var router = express.Router();              

router.use(function(req, res, next) {
    var fullUrl = req.method + " " + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    next(); 
});

router.get('/', function(req, res) {
    res.json({ message: 'API root' });   
});

var resourceController = require('./controllers/resourceController');

// REGISTER ROUTES
// ----------------------------------------------------

app.use('/api', router);
app.use('/api', resourceController);

// START THE SERVER
// =============================================================================

var port = process.env.PORT || 3000; 
app.listen(port);
console.log('Listening on port ' + port);