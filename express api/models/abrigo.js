var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var AbrigoSchema = new Schema({
	id: String,
    nome: String
});

module.exports = mongoose.model('Abrigo', AbrigoSchema);
