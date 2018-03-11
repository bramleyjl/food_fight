let students = require('../models/students');
let votes = require('../models/votes');

module.exports.display = function(req, res) {
  var studentInfo = undefined
  var studentVote = votes.displayStudentVote(req.query.student);
  studentVote.then( function( display) {
    studentInfo = display[0]
    var total_votes = votes.tallyVotes();
    total_votes.then( function(votes) {
      res.render('vote', {display: studentInfo, votes: votes});
    });
  });
}

module.exports.sendVote = function(req, res) {
  var checkVote = votes.checkVote(req.body.student, req.body.vote)
  checkVote.then( function(vote) {
    if (vote === 0) {
      res.redirect('/vote/?student=' + req.body.student)  
    } else {
      var createVote = votes.createVote(req.body.student, req.body.vote)
      createVote.then( function(vote) {
        res.redirect('/vote/?student=' + req.body.student)
      });
    }
  }); 
}