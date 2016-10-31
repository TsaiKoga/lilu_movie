(function() {
  var superagent = require("superagent");
  var charset = require('superagent-charset');
  var request = charset(superagent);

  var cheerio = require("cheerio");
  var url = require('url');
  var Movie = require("./models/movie").Movie;



  var targetURL = "http://www.ygdy8.com/html/gndy/dyzz/index.html";

  request.get(targetURL).end(function(err, res) {
    if (err) return err;
    var $ = cheerio.load(res.text);

    $("#header .co_content8 table .ulink").each(function(index, elem) {
      var movieURL = url.resolve(targetURL, $(elem).attr("href"));

      request.get(movieURL).charset('GB2312').end(function(err, res) {
        // var body = iconv.decode(new Buffer(res.text), 'GB2312');
        var $ = cheerio.load(res.text);
        if (err) return err;

        var title = $("#header .co_area2 .title_all h1 font").text();
        var description = $("#header .co_area2 #Zoom p").text();
        var img = $("#header .co_area2 #Zoom p img").attr("src");
        var downloadLink = $("#header .co_area2 #Zoom table td a").text();

        var rpattern = new RegExp(/\◎类　　别\s+(\S+)\◎/);
        var tags = (description.match(rpattern) ? description.match(rpattern)[1].split(/\//) : [])
        var description = description.replace(/\◎/g, "\r\n◎").replace(/ \【下载地址\】.+(\s+)(.+)(\s+)/, "");

        Movie.findOne({title: title}, function(err, exMovie) {
          if (exMovie) {
            console.log("It exists Movie: " + title);
          } else {
            var movie = {
              title: title,
              description: description,
              img: img,
              download_link: downloadLink,
              author: "Me",
              tags: tags,
              created_at: new Date()
            };
            Movie.create(movie, function(err, movieRec) {
              if (err) console.log(err);
              console.log("Success create Movie: " + movieRec._id + ", 名称：" + movieRec.title);
            });
          }
        });
      });
    });
  });
})()
