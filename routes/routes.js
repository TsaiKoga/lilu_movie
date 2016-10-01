var express = require('express');
var router = express.Router();

var home = require("./../controllers/index");
var users = require("./../controllers/users");
var movies = require("./../controllers/movies");

router.get('/', home.index);
router.get('/login', users.login);
router.get('/movies', movies.index);

module.exports = router;
