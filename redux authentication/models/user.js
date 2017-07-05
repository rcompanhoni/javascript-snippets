const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define the model
const userSchema = new Schema({
    email: { type: String, required: true, lowercase: true },
    password: String
});

// on save hook, encrypt password
userSchema.pre('save', function(next) {
    const user = this;

    // generate salt
    bcrypt.genSalt(10, function(err, salt) {
        if(err) { return next(err) };

        // use salt to encrypt the password
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err) }

            user.password = hash;
            next();
        });
    });
});

// compares the informed candidate password with the actual entity password
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    })
}

// create the actual model class (corresponds to a Mongo collection named 'user')
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;