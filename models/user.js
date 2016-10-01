var mongoose = require("mongoose");
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/lilu_movie');

var UserSchema = mongoose.Schema;

var _User = new UserSchema({
  email:    String,
  name:     String,
  salt:     String,
  password: String
});

exports.User = db.model('User', _User);
