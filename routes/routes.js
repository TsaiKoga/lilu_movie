var express = require('express');
var router = express.Router();

var home = require("./../controllers/index");
var users = require("./../controllers/users");
var movies = require("./../controllers/movies");

router.get('/', home.index);
router.get('/login', users.login);
router.get('/movies', movies.index);
router.get('/movies/:id', movies.show);

module.exports = router;
