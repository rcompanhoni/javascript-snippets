// TODO - implement a strong hashing scheme for the access token. Never store them as plain text as we are in this example

var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    value: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

module.exports = mongoose.model('Token', TokenSchema);