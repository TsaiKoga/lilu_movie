var mongoose = require("mongoose");
var config = require("./../config");
// 连接数据库
var db = mongoose.createConnection(config.db.mongoose);

// 链接错误
db.on('error', function(error) {
  console.log(error);
});


// 创建collection的schema，类似table
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

// 指定数据库这个collection，并导出orm
exports.Movie = db.model("Movie", _Movie);
