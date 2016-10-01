var express = require('express');
var router = express.Router();

var home = require("./index");
var users = require("./users");
var movies = require("./movies");

router.get('/', home.index);
router.get('/login', users.login);
router.get('/movies', movies.index);

module.exports = router;
