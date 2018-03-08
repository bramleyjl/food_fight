var express = require('express');
var router = express.Router();
var index = require('../controllers/index.js');
var vote = require('../controllers/vote.js');

router.get('/', index.home);

router.post('/login', index.login);

router.post('/signup', index.signup);

router.get('/vote', vote.display);

router.post('/vote', vote.sendVote);

module.exports = router;