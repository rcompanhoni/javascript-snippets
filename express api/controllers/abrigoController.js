var express = require('express');

var Abrigo = require('../models/abrigo');

var router = express.Router();

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

module.exports = router;