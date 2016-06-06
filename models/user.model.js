var connection = require('./db.model');

function User(name, email, password) {
  this.name = name;
  this.email = email;
  this.password = password;
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
       return callback(err);
     }
     callback(null, rows);
   });
 };


 // 根据邮箱查找用户
 User.findUserByEmail = function (email, callback) {

   var select = 'SELECT * FROM user WHERE email=?';
   connection.query(select, [email], function (err, rows) {
     if (err) {
       console.error('error select: ' + err.stack);
       return callback(err);
     }

     callback(null, rows);
   });
 };



// 根据邮箱更新密码
User.updatePasswordByEmail = function (email, password, callback) {
  var sql = 'UPDATE user SET password=? WHERE email=?';
  connection.query(sql, [password, email], function (err, rows) {
    if (err) {
      console.error('error update password by email: ' + err.stack);
      return callback(err);
    }

    callback(null, rows);
  });


};



module.exports = User;