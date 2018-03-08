let db = require('../db.js');

exports.displayStudentVote = function(id) {
  return new Promise(function (resolve, reject) {
    db.query("SELECT \
      `votes`.*, \
      `students`.`name` AS `student_name`, \
      `fruit`.`name` AS `fruit_name` \
      FROM `votes` \
      JOIN `students` ON `votes`.`student_id` = `students`.`id` \
      JOIN `fruit` ON `votes`.`fruit_id` = `fruit`.`id` \
      WHERE `votes`.`student_id` = ?", [id],
    function (err, result) {
      if (err) return reject(err);
      return resolve(result)
    });
  });
}