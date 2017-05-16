var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
});

userSchema.methods.verifyPassword = function (senha, callback) {
  bcrypt.compare(senha, this.senha, function (err, isMatch) {
    if (err) return cb(err);
    callback(null, isMatch);
  });
};

// executado antes de uma chamada a save()
userSchema.pre('save', function (callback) {
  var user = this;

  if (!user.isModified('senha')) return callback();

  // senha foi alterada -- precisa ser criptografada novamente
  bcrypt.genSalt(5, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.senha, salt, null, function (err, hash) {
      if (err) return callback(err);

      user.senha = hash;
      callback();
    });
  });
});

mongoose.model('Usuario', userSchema)