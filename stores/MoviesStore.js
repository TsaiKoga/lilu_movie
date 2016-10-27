var EventEmitter = require("events").EventEmitter;

class MoviesStore extends EventEmitter {
  constructor() {
    super();
  }

  //method: GET /movies/:id
  findMovie(id, callback) {
    var self = this;
    fetch('/movies/' + id).then(function(res) {
      if(res.ok) {
        res.json().then(function(data) {
          callback(data);
        });
      } else {
        console.log("Respond Error!");
      }
    }, function(e) {console.log("Fetch Error: " + e)});
  }

  //method: GET /movies
  getAllMovies(tags, callback) {
    var self = this;
    var url = (tags.length === 0 ? "/movies" : `/movies?tags=${tags}`);
    fetch(url).then(function(res) {
      if(res.ok) {
        res.json().then(function(data) {
          callback(data);
        });
      } else {
        console.log("Respond Error!");
      }
    }, function(e) {console.log("Fetch Error: " + e);})
  }
};

module.exports = new MoviesStore();
