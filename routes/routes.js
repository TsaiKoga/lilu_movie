var express = require('express');
var router = express.Router();

var home = require("./index");
var users = require("./users");

router.get('/', home.index);
router.get('/login', users.login);

module.exports = router;
