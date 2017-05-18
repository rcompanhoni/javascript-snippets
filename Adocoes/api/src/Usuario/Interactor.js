export default class Interactor {
	constructor(deps = {}) {
		this.Entity = deps.Entity || new (require('./Entity').default)()
	}

	create(body) {
		return this.Entity.save(body)
	}

	fetchAll(body) {
		return this.Entity.fetchAll()
	}

	findById(id) {
		return this.Entity.findById(id);
	}

	update(body) {
		return this.Entity.update(body)
	}
}