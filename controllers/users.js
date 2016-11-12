var bcrypt = require('bcrypt');
// Create a password salt
var salt = bcrypt.genSaltSync(10);

var User = require("./../models/user").User;

// POST: /api/users/sign_in
exports.signIn = function(req, res, next) {
  // TODO: req.params   req.query  req.body
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) return res.status(404).json({errors: err});

    if (user) {
      user.authenticate(req.body.password, function(err, isMatch) {
        if (err) return res.status(404).json({error: err});
        if (isMatch) {
          res.status(200).json({user: user.toJSON()});
        } else {
          res.json({errors: "邮箱或密码错误"});
        }
      });
    } else {
      res.json({errors: "没有此账号，请先注册再登录"});
    }
  });
};

// POST: /api/users/sign_up
exports.signUp = function(req, res, next) {
  console.log(req);
  var user = new User(req.params);
  user.save(function(err, user) {
    if (err) {
      res.status(404).json({errors: err});
    } else {
      res.status(200).json({user: user.toJSON()});
    }
  });
};
