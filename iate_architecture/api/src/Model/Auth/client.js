// TODO: consider auto generating the client id and secret in order to enforce uniqueness, randomness, and strength
// TODO: hash the secret

var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    clientId: { type: String, required: true },
    secret: { type: String, required: true }, 
    userId: { type: String, required: true }
});

mongoose.model('Client', clientSchema)