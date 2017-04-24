var express = require('express');

var Resource = require('../../models/resource');

var router = express.Router();

router.route('/resources')
    .post(function(req, res) {
        var resource = new Resource();      
        resource.name = req.body.name;
        resource.subResources = req.body.subResources;

        resource.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Resource created' });
        });
    })
    .get(function(req, res) {
        Resource.find(function(err, resources) {
            if (err)
                res.send(err);

            res.json(resources);
        });
    });

router.route('/resources/:resource_id')
    .get(function(req, res) {
        Resource.findById(req.params.resource_id, function(err, resource) {
            if (err)
                res.send(err);

            res.json(resource);
        });
    })
    .put(function(req, res) {
        Resource.findById(req.params.resource_id, function(err, resource) {
            if (err)
                res.send(err);

            if (req.body.name) {
                resource.name = req.body.name;
            }

            resource.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Resource updated' });
            });
        });
    })
    .delete(function(req, res) {
        Resource.remove({
            _id: req.params.resource_id
        }, function(err, resource) {
            if (err)
                res.send(err);

            res.json({ message: 'Resource deleted' });
        });
    });

module.exports = router;