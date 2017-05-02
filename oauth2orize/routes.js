var express = require('express');
var router = express.Router();

var authController = require('./controllers/authController');
var resourceController = require('./controllers/resourceController');

// resource
router.post('/resources', resourceController.createResource);
router.get('/resources', resourceController.getResources);
router.get('/resources/:resource_id', resourceController.getResourceById);
router.put('/resources/:resource_id', resourceController.updateResource);
router.delete('/resources/:resource_id', resourceController.deleteResource);

module.exports = router;