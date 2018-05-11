let students = require('../models/students');
let votes = require('../models/votes');

module.exports.home = function(req, res) {
  var total_votes = votes.tallyVotes();
  total_votes.then( function(votes) {
   res.render('home', {votes: votes});
  });
}

module.exports.login = function(req, res) {
  var student = students.lookupStudent(req.body.name);
  student.then( function(studentId) {
    if (studentId.length === 0) {
      var total_votes = votes.tallyVotes();
      total_votes.then( function(votes) {
        res.render('home', {noStudent: req.body.name, votes: votes});
      });
    } else {
      res.redirect('/vote/?student=' + studentId[0].id);
    }
  });
}

module.exports.signup = function(req, res) {
  var checkName = students.lookupStudent(req.body.name)
  checkName.then( function(studentId) {
    if (studentId.length === 0) {
      var newStudent = students.createStudent(req.body.name)
      newStudent.then( function(studentId) {
        res.redirect('/vote/?student=' + studentId);
      });
    } else {
      var total_votes = votes.tallyVotes();
      total_votes.then( function(votes) {
        res.render('home', {duplicateStudent: studentId[0].name, votes: votes});
      });
    }
  });
}