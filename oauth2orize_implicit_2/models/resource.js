var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subResource = new Schema({
	name: String
});

var resourceSchema = new Schema({
	name: String,
	creatorId: String,
	subResources: [subResource]
});

module.exports = mongoose.model('Resource', resourceSchema);
