var UserModel = require("./../models/user").User;
var title = "哩噜电影";

exports.login = function(req, res, next) {
  res.render('login', {title: (title + " | 登录")});
};

exports.logout = function(req, res, next) {
  res.json();
};
