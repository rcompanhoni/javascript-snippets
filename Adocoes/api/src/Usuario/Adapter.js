import mongoose from 'mongoose'

export default class Adapter {
	constructor(deps = {}) {
		this.Usuario = mongoose.model('User')
	}

	save(body) {
		const usuario = new this.Usuario(body)
		return usuario.save()
	}

	update(body) {
		return this.Usuario.findById(body.id, (err,usuario) => {
            if (err)
                throw (new Error("Erro ao buscar usuário"))

			if (!usuario)
				return null

			usuario.username = body.username;
			usuario.senha = body.password;

            usuario.save(function(err) {
                if (err)
                    return err;

                return usuario;
            });
        });
	}

	fetchAll() {
		return this.Usuario.find()
	}

	findById(id) {
		return this.Usuario.findById(id, function(err, usuario) {
			if(err)
				return err

			return usuario;
		})
	}
}