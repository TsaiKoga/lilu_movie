var mongoose = require("mongoose");

var UserSchema = mongoose.Schema;

var _User = new UserSchema({
  email:    String,
  name:     String,
  salt:     String,
  password: String
});

exports.User = mongoose.model('User', _User);
