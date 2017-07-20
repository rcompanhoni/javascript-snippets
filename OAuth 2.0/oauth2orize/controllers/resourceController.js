var express = require('express');

var Resource = require('../models/resource');

module.exports.createResource = function (req, res) {
    var resource = new Resource();      
    resource.name = req.body.name;
    resource.subResources = req.body.subResources;
    resource.creatorId = req.user._id; // added by passport

    resource.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Resource created' });
    });
}

module.exports.getResources = function (req, res) {
    Resource.find(function(err, resources) {
        if (err)
            res.send(err);

        res.json(resources);
    });
}

module.exports.getResourceById = function (req, res) {
    Resource.findById(req.params.resource_id, function(err, resource) {
        if (err)
            res.send(err);

        res.json(resource);
    });
}

module.exports.updateResource = function (req, res) {
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
}

module.exports.deleteResource = function (req, res) {
    Resource.remove({
        _id: req.params.resource_id
    }, function(err, resource) {
        if (err)
            res.send(err);

        res.json({ message: 'Resource deleted' });
    });
}
