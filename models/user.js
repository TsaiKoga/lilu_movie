var mongoose = require("mongoose");
var config = require("./../config")
var db = mongoose.createConnection(config.db.mongoose);

var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema;

var _User = new UserSchema({
  email:    {
    type: String,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "请输入正确的邮箱"],
    required: [true, "请输入邮箱"],
    unique: [true, "该邮箱已被注册"]
  },
  name:     {
    type: String,
    unique: [true, "该昵称已被注册"],
    default: "无名氏"
  },
  salt:     String,
  password: {
    type: String,
    min: [8, "密码必须8位以上"],
    max: [256, "密码太长"]
  },
  admin: {
    type: Boolean,
    default: false
  },
  created_at: { type: String, default: Date.now }
});

// Methods: User实例方法
_User.method({
  authenticate: function (password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
      return callback(err, isMatch);
    });
  }
});


exports.User = db.model('User', _User);
