var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var React = require('react');
var renderToString = require('react-dom/server').renderToString;
var match = require('react-router').match;
var RouterContext = require('react-router').RouterContext;
var routes = require('./assets/javascripts/routes');
var fetchDataBeforeRender = require("./stores/fetchDataBeforeRender");

var app = express();

app.use(compression());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  match({ routes: routes, location: req.url }, (err, redirect, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    } else if(redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if(renderProps) {
      var initialState = {}
      var initialView = renderToString(
        <RouterContext {...renderProps} />
      );
      res.status(200).end(renderFullPage(initialView, initialState);
    } else {
      res.status(404).send('Not Found');
    }
  });
});

function renderFullPage(appHtml, initialState) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>哩噜电影</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- styles -->

  </head>
  <body>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <div id="app">
      ${appHtml}
    </div>
  </body>

  <script type="text/javascript" src="http://localhost:8080/javascripts/bundle.js" charset="utf-8"></script>
  <script type="text/javascript" src="javascripts/common.js" charset="utf-8"></script>
  <script type="text/javascript" src="javascripts/bundle.js" charset="utf-8"></script>
  </html>
  `
}

var PORT = process.env.PORT || 3003;
app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT);
});
