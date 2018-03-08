let db = require('../db.js');

exports.createStudent = function(name) {
  return new Promise(function (resolve, reject) {
    db.query("INSERT INTO `students` SET `name` = ?", [name], 
    function (err, result) {
      if (err) return reject(err);
      var newStudentId = result.insertId
      db.query("INSERT INTO `votes` (`student_id`, `fruit_id`) VALUES (?, 999)", [newStudentId],
      function (err, result) {
        if (err) return reject(err);
        return resolve(newStudentId);
      })
    });
  });
}

exports.lookupStudent = function(name) {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM `students` WHERE `name` = ?", [name],
    function (err, result) {
      if (err) return reject(err);
      return resolve(result)
    });
  });
}