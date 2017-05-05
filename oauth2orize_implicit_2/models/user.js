var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    callback(null, isMatch);
  });
};

// execute before each user.save() call
UserSchema.pre('save', function (callback) {
  var user = this;

  if (!user.isModified('password')) return callback();

  // password changed so we need to hash it
  bcrypt.genSalt(5, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return callback(err);

      user.password = hash;
      callback();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);