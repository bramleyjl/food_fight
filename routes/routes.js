var express = require('express');
var router = express.Router();
var index = require('../controllers/index.js');
var vote = require('../controllers/vote.js');

router.get('/', index.home);

router.post('/login', index.login);

router.post('/signup', index.signup);

router.get('/vote', vote.display);

module.exports = router;