var mongoose = require("mongoose");
var config = require("./../config")
var db = mongoose.createConnection(config.db.mongoose);

var UserSchema = mongoose.Schema;

var _User = new UserSchema({
  email:    String,
  name:     String,
  salt:     String,
  password: String
});

exports.User = db.model('User', _User);
