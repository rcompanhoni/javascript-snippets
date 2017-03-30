var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var areaSchema = new Schema({
	id_area: Number,
	nome: String
});

var enderecoSchema = new Schema({
	rua: String,
	numero: Number,
    cep: Number,
    telefone: [Number]
});

var abrigoSchema = new Schema({
    nome: String,
	areas: [areaSchema],
    endereco: enderecoSchema
});

module.exports = mongoose.model('Abrigo', abrigoSchema);
