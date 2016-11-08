var Movie = require("./../models/movie").Movie;

// GET: /api/movies/index
exports.index = function(req, res, next) {
  // req.query 如果是{},返回所有电影集合；如果是{tagName: "xxx"}，返回标签是xxx的电影集合
  Movie.find(req.query, function (err, movies) {
    if (err) return handleError(err);
    res.json(movies);
  });
};

// GET: /api/movies/:id
exports.show = function(req, res, next) {
  Movie.findById(req.params.id, function(err, movie) {
    if (err) return handleError(err);
    res.json(movie);
  })
}
