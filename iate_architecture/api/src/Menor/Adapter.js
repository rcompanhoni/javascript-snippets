import mongoose from 'mongoose'

export default class Adapter {
	constructor(deps = {}) {
		this.Menor = mongoose.model('Menor')
	}

	save(body) {
		const menor = new this.Menor(body)

		return menor.save()
	}

	fetchAll() {
		return this.Menor.find()
	}
}