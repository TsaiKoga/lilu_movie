var EventEmitter = require("events").EventEmitter;

class MoviesStore extends EventEmitter {
  constructor() {
    super();
  }

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

  getAllMovies(callback) {
    var self = this;
    fetch("/movies").then(function(res) {
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
