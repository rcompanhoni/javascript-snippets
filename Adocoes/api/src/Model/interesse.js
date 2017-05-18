var mongoose = require('mongoose')
var Schema = mongoose.Schema

var interesseSchema = new Schema({
	idInteressado: String,
	idMenor: String,
	timeStamp: Date
})
