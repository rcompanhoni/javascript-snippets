var mongoose = require('mongoose')
var Schema = mongoose.Schema

var locationSchema = new Schema({
	city: String,
	uf: String,
	country: String
})

var placeOfBirthSchema = new Schema({
	city: String,
	uf: String,
	country: String
})

var familyReferencesSchema = new Schema({
	refType: String,
	name: String
})

var menorSchema = mongoose.Schema({
	name: String,
	gender: String,
	birthDate: Date,
	shelterGuide: String,
	birthCertificate: String,
	familyReferences: [familyReferencesSchema],
	nationality: String,
	placeOfBirth: placeOfBirthSchema,
	location: locationSchema,
	shelterRef: String
})

mongoose.model('Menor', menorSchema)