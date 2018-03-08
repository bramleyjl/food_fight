let students = require('../models/students');
let votes = require('../models/votes');

module.exports.display = function(req, res) {
  var studentVote = votes.displayStudentVote(req.query.student);
  studentVote.then( function( display) {
    console.log(display[0])
   res.render('vote', {display: display[0]});
  });
}