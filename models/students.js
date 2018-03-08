let db = require('../db.js');

exports.createStudent = function(name) {
  return new Promise(function (resolve, reject) {
    db.query("INSERT INTO `students` SET `name` = ?", [name], 
    function (err, result) {
      if (err) return reject(err);
      return resolve(result.insertId)

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