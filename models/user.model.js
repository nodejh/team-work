var connection = require('./db.model');

function User(name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
}


// 向数据库插入新用户
User.prototype.insert = function (callback) {
  var time = parseInt(new Date().getTime() / 1000);
  var data = {
      name: this.name,
      password: this.password,
      email: this.email,
      time: time
  };

  var insert = 'INSERT user SET ?';
  connection.query(insert, data, function (err, rows) {
    if (err) {
      console.error('error insert: ' + err.stack);
      return callback(error);
    }

    callback(null, rows);
  });

};


// 根据邮箱查找用户
User.prototype.findUserByEmail = function (email, callback) {
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return callback(error);
    }

    console.log('connected as id ' + connection.threadId);
    var select = 'SELECT * FROM user WHERE email=?';
    connection.query(function (err, rows) {
      if (err) {
        console.error('error select: ' + err.stack);
        return callback(error);
      }

      callback(null, rows);
    });
  });
};
