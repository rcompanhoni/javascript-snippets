// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser() -- this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/adocoesDb');

var Abrigo     = require('./models/abrigo'); 

// ROUTES
// =============================================================================

var router = express.Router();              

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// ABRIGO
// ----------------------------------------------------
router.route('/abrigos')
    .post(function(req, res) {
        
        var abrigo = new Abrigo();      // create a new instance of the model
        abrigo.nome = req.body.nome;    // set the name (comes from the request)

        // save the bear and check for errors
        abrigo.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Abrigo criado!' });
        });
    })
    .get(function(req, res) {
        Abrigo.find(function(err, abrigos) {
            if (err)
                res.send(err);

            res.json(abrigos);
        });
    });

router.route('/abrigos/:id_abrigo')
    .get(function(req, res) {
        Abrigo.findById(req.params.id_abrigo, function(err, abrigo) {
            if (err)
                res.send(err);

            res.json(abrigo);
        });
    })
    .put(function(req, res) {
        Abrigo.findById(req.params.id_abrigo, function(err, abrigo) {
            if (err)
                res.send(err);

            abrigo.nome = req.body.nome;
            abrigo.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Abrigo atualizado!' });
            });
        });
    })
    .delete(function(req, res) {
        Abrigo.remove({
            _id: req.params.id_abrigo
        }, function(err, abrigo) {
            if (err)
                res.send(err);

            res.json({ message: 'Abrigo deletado' });
        });
    });

// REGISTER OUR ROUTES -------------------------------

// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);