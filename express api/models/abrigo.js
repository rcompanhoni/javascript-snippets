var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var enderecoSchema = new Schema ({
	rua: String,
    numero: Number,
    cep: Number,
    telefone: [Number]
});

var areaSchema = new Schema({
	id_area: Number,
	nome: String
});

var abrigoSchema = new Schema({
    nome: String,
	endereco: enderecoSchema
});

module.exports = mongoose.model('Abrigo', abrigoSchema);
