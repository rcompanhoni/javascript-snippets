import restify from 'restify'
import bodyParser from 'body-parser'

import ConteudoTranslator from './api/src/Conteudo/Translator'
import MenorTranslator from './api/src/Menor/Translator'
import UsuarioTranslator from './api/src/Usuario/Translator'

require('./database.js')

const server = restify.createServer()
const port = process.env.PORT || 8888

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
})); 

server.get('/', function(req, res, next) {
    const moment = require('moment')
    let now = moment()
    console.log(req.headers)
    res.json(200, {
        status: 200,
        now: now.toString(),
        unix_now: now.unix()
    })
})

// CONTEUDOS
// ----------------------------------------------------

server.post('/conteudos', (request, response, next) => {
	let conteudoTranslator = new ConteudoTranslator()
	conteudoTranslator.post(request, response)
})

server.get('/conteudos', (request, response, next) => {
    const conteudoTranslator = new ConteudoTranslator()
    conteudoTranslator.get(request, response)
})

// MENORES
// ----------------------------------------------------

server.post('/menores', (request, response, next) => {
    const menorTranslator = new MenorTranslator()
    menorTranslator.post(request, response)
})

server.get('/menores', (request, response, next) => {
    const menorTranslator = new MenorTranslator()
    menorTranslator.get(request, response)
})

// USUARIOS
// ----------------------------------------------------

server.post('/usuarios', (request, response, next) => {
    const usuarioTranslator = new UsuarioTranslator()
    usuarioTranslator.post(request, response)
})

server.get('/usuarios', (request, response, next) => {
    const usuarioTranslator = new UsuarioTranslator()
    usuarioTranslator.get(request, response)
})

server.listen(port, function() {
    console.log('Adoções API running! Port: ' + port)
})

