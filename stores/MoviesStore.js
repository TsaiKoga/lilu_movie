var EventEmitter = require("events").EventEmitter;

class MoviesStore extends EventEmitter {
  constructor() {
    super();
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
