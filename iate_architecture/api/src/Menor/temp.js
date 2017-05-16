var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
//var moment = require('moment'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/adocoesDb');

var Menor = require('./models/menor'); 
var Interessado = require('./models/interessado');
var Interesse = require('./models/interesse');
var router = express.Router();          

router.use(function(req, res, next) {
    console.log('Processando requisição...');
    next(); 
});

router.get('/', function(req, res) {
    res.json({ message: 'API Adoções' });   
});

// RFM01 e RFM02
router.route('/menores')
    .post(function(req, res) {
        
        var menor = new Menor();      
        menor.name = req.body.name;
        menor.gender = req.body.gender;
        menor.birthDay = req.body.birthDay;
        menor.shelterGuide = req.body.shelterGuide;
        menor.birthCertificate = req.body.birthCertificate;
        menor.familyReferences = req.body.familyReferences;
        menor.nationality = req.body.nationality;
        menor.placeOfBirth = req.body.placeOfBirth;
        menor.location = req.body.location;
        menor.shelterRef = req.body.shelterRef;

        menor.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Menor criado com sucesso!' });
        });
    })
    .get(function(req, res) {
        Menor.find(function(err, menores) {
            if (err)
                res.send(err);

            res.json(menores);
        });
    });

//RFM03, RFM04 e RFM05
router.route('/menores/:id_menor')
    .get(function(req, res) {
        Menor.findById(req.params.id_menor, function(err, menor) {
            if (err)
                res.send(err);

            res.json(menor);
        });
    })
    .put(function(req, res) {
        Menor.findById(req.params.id_menor, function(err, menor) {
            if (err)
                res.send(err);

            menor.name = req.body.name || menor.name;
            menor.gender = req.body.gender || menor.gender;
            menor.birthDay = req.body.birthDay || menor.birthDay;
            menor.shelterGuide = req.body.shelterGuide || menor.shelterGuide;
            menor.birthCertificate = req.body.birthCertificate || menor.birthCertificate;
            menor.familyReferences = req.body.familyReferences || menor.familyReferences;
            menor.nationality = req.body.nationality || menor.nationality;
            menor.placeOfBirth = req.body.placeOfBirth || menor.placeOfBirth;
            menor.location = req.body.location || menor.location;
            menor.shelterRef = req.body.shelterRef || menor.shelterRef;

            menor.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Menor atualizado com sucesso!' });
            });
        });
    })
    .delete(function(req, res) {
        Menor.remove({
            _id: req.params.id_menor
        }, function(err, menor) {
            if (err)
                res.send(err);

            res.json({ message: 'Menor deletado com sucesso!' });
        });
    });

//RFM06
/*router.route('/menores/ordenacao')
    .get(function(req, res){
        Interesse.findById(req.params.?, function(err, ?) {
            if (err)
                res.send(err);

            res.json(?);
        });
    });*/


//RFM07 e RFM08
router.route('/menores/:id_menor/interessados')
   .post(function(req, res){
        var interesse = new Interesse();
        interesse.idInteressado = req.body.idInteressado;
        interesse.IdMenor = req.params.id_menor; 

        // TODO - Ver timestamp que não está funcionando.
        /*var now = moment();
        interesse.timeStamp = now.toString();*/       
        
        interesse.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Interesse foi adicionado!' });
        });
    })
    .get(function(req, res){
        Interesse.findById(req.params.id_menor, function(err, interessados) {
            if (err)
                res.send(err);

            res.json(interessados);
        });
    });

//RFM09
/*router.route('/menores/:id_menor/interessados/:id_interessado')
    .delete(function(req, res) {
        Interessados.remove({
            _id: req.params.id_interessado;
        }, function(err, interessados) {
            if (err)
                res.send(err);

            res.json({ message: 'Interessado deletado com sucesso!' });
        });
    }); */

app.use('/api', router);

var port = process.env.PORT || 3000; 
app.listen(port);
console.log('Conectado na porta ' + port +"...");