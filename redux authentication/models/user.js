const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the model
const userSchema = new Schema({
    email: { type: String, required: true, lowercase: true },
    passport: String
});

// create the actual model class (corresponds to a Mongo collection named 'user')
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;