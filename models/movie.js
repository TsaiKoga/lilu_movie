var mongoose = require("mongoose");

var MovieSchema = mongoose.Schema;

var _Movie = new MovieSchema({
  title:          String,
  description:    String,
  download_link:  String,
  author:         String,
  img:            String,
  tags:           { type: [String], index: true },
  created_at:     { type: Date, default: Date.now },
  meta: {
    votes: Number,
    favs:  Number
  }
});

exports.Movie = mongoose.model("Movie", _Movie);
