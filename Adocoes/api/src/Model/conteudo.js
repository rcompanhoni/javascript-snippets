import mongoose  from 'mongoose'

const Schema = mongoose.Schema

mongoose.model('Conteudo',
	new Schema({}, {strict: false})
)