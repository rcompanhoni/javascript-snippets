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

var Abrigo     = require('./models/abrigo'); 

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

// ABRIGO
// ----------------------------------------------------
router.route('/abrigos')
    .post(function(req, res) {
        
        // create new instance with request data
        var abrigo = new Abrigo();      
        abrigo.nome = req.body.nome;
        abrigo.areas = req.body.areas;    
        abrigo.endereco = req.body.endereco;

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

            // update instance with request data 
            abrigo.nome = req.body.nome || abrigo.nome;
            abrigo.areas = req.body.areas || abrigo.areas;    
            abrigo.endereco = req.body.endereco || abrigo.endereco;

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

var port = process.env.PORT || 3000; 
app.listen(port);
console.log('Magic happens on port ' + port);