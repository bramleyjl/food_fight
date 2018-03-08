let students = require('../models/students');

module.exports.home = function(req, res) {
   res.render('home')
}

module.exports.login = function(req, res) {
  var student = students.lookupStudent(req.body.name);
  student.then( function(studentId) {
    if (studentId.length === 0) {
      res.render('home', {noStudent: req.body.name});
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
      res.render('home', {duplicateStudent: studentId[0].name});
    }
  });
}