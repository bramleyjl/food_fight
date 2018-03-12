let db = require('../db.js');

exports.checkVote = function(student, vote) {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM `votes` WHERE `student_id` = ?", [student],
    function(err, result) {
      if (err) return reject(err);
      if (result.length === 0 || result[0].fruit_id !== parseInt(vote)) {
        return resolve(result)
      } else {
        return resolve(0)
      }
    });
  });
}

exports.createVote = function(student, vote) {
  return new Promise(function (resolve, reject) {
    db.query("DELETE FROM `votes` WHERE `student_id` = ?", [student],
    function(err, result) {
      if (err) return reject(err);
      db.query("INSERT INTO `votes` (`student_id`, `fruit_id`) VALUES (?, ?)", [student, vote],
      function(err, result) {
        if (err) return reject(err);
        return resolve(result)
      });
    });
  });
}

exports.displayStudentVote = function(id) {
  return new Promise(function (resolve, reject) {
    db.query("SELECT \
      `votes`.*, \
      `students`.`name` AS `student_name`, \
      `fruit`.`name` AS `fruit_name`, \
      `fruit`.`picture` AS `fruit_picture` \
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

exports.tallyVotes = function() {
  return new Promise(function (resolve, reject) {
    db.query("SELECT `fruit_id`, \
      `fruit`.`name` AS `fruit_name`, \
      `fruit`.`picture` AS `fruit_picture`, \
      COUNT(*) AS `total_votes` \
      FROM `votes` \
      JOIN `fruit` ON `votes`.`fruit_id` = `fruit`.`id` \
      GROUP BY `fruit_id` \
      ORDER BY `total_votes` DESC",
    function (err, result) {
      var voteTotal = 0
      for (var i = result.length - 1; i >= 0; i--) {
        voteTotal += result[i].total_votes
      }
      for (var j = result.length - 1; j >= 0; j--) {
        var votePercent = (result[j].total_votes/voteTotal) * 100
        result[j].vote_percent = votePercent
      }
      if (err) return reject(err);
      return resolve(result)
    });
  });
}