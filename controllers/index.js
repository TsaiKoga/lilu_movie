var title = "哩噜电影";

exports.index = function(req, res, next) {
  return res.render('home', {title: title});
};
