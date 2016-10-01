var Movie = require("./../models/movie").Movie;

exports.index = function(req, res, next) {
  res.send([
    {title: "魔兽争霸", img: "./../images/p2255668573.jpg", description: ""},
    {title: "美国队长3", img: "./../images/p2332092960.jpg", description: ""},
    {title: "地雷区", img: "./../images/p2340515119.jpg", description: ""},
    {title: "魔幻森林", img: "./../images/p2372661910.jpg", description: ""}
  ]);
};
