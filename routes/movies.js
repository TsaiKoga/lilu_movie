var Movie = require("./../models/movie").Movie;

exports.index = function(req, res, next) {
  Movie.find({}, function (err, movies) {
    if (err) return handleError(err);
    res.send(movies);
  });
};
