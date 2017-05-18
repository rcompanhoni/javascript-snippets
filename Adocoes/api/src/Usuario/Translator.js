export default class Translator {
	constructor(deps = {}) {
		this.Interactor = deps.Interactor || new (require('./Interactor').default)()
	}

	post(request, response) {
		const { body } = request
        
        this.Interactor.create(body)
            .then(message => {
                response.send(200, message)
            })
            .catch(error => {
                console.log(error)
            })
	}

    get(request, response) {
		const { body } = request

        this.Interactor.fetchAll()
            .then(message => {
                response.send(200, message)
            })
            .catch(error => {
                console.log(error)
            })
	}

    getById(request, response) {
        this.Interactor.findById(request.params.usuario_id)
            .then(message => {
                if (!message)
                    response.send(400, { message: "Nenhum usuário com o ID=" + id + " foi encontrado"})

                response.send(200, message)
            })
            .catch(error => {
                console.log(error)
            })
	}

    put(request, response) {
		const { body } = request

         this.Interactor.update(body)
            .then(message => {
                if (!message)
                    response.send(400, { message: "Nenhum usuário com o ID informado foi encontrado"})

                response.send(200, message)
            })
            .catch(error => {
                response.send(500, message)
            })        
	}
}
