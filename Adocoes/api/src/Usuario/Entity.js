export default class Entity {
	constructor(deps = {}) {
		this.Adapter = deps.Adapter || new (require('./Adapter').default)()
	}

	save(body) {
		return this.Adapter.save(body)
	}

	fetchAll() {
		return this.Adapter.fetchAll()
	}

	findById(id) {
		return this.Adapter.findById(id)
	}

	update(body) {
		return this.Adapter.update(body)
	}
}