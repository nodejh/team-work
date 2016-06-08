var connection = require('./db.model');

function Weekly(title, week, file) {
  this.title = title;
  this.week = week;
  this.file = file;
}

// 上传周报操作
Weekly.prototype.upload = function (user_id, project_id,project_name, callback) {
  var time = parseInt(new Date().getTime() / 1000);
  var data = {
    user_id: user_id,
    project_id :project_id,
    project_name:project_name,
    title: this.title,
    week: this.week,
    file: this.file,
    time: time
  };

  console.log('weekly data: ', data);

  // 存储数据
  var insert = 'INSERT INTO weekly SET ?';
  connection.query(insert, data, function (err, rows) {
    if (err) {
      console.error('error insert: ' + err.stack);
      return callback(err);
    }

    callback(null, rows);
  });
};



// 根据 user_id 查找周报
Weekly.findByUserId = function (user_id, callback) {
  var sql = 'SELECT * FROM weekly WHERE user_id=?';
  connection.query(sql, [user_id], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};

//
Weekly.findByProjectId = function (project_id, callback) {
  var sql = 'SELECT * FROM weekly WHERE user_id=?';
  connection.query(sql, [project_id], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};



// 查找所有周报
Weekly.findAll = function (callback) {
  var sql = 'SELECT * FROM weekly ' +
    'LEFT JOIN user ' +
    'ON weekly.user_id=user.id';
  connection.query(sql, function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};


module.exports = Weekly;
