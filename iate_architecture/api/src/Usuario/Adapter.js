import mongoose from 'mongoose'

export default class Adapter {
	constructor(deps = {}) {
		this.Usuario = mongoose.model('User')
	}

	save(body) {
		const usuario = new this.Usuario(body)
		return usuario.save()
	}

	fetchAll() {
		return this.Usuario.find()
	}
}