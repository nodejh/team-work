var connection = require('./db.model');
var smtpTransport =require('./nodemailer.model');


function Account(email, token) {
  this.email = email;
  this.token = token;
}



// 向数据库插入找回密码记录
Account.prototype.insert = function (callback) {
  var time = parseInt(new Date().getTime() / 1000);
  var data = {
    email: this.email,
    token: this.token,
    time: time
  };

  var insert = 'INSERT INTO account SET ?';
  connection.query(insert, data, function (err, rows) {
    console.log('向数据库插入找回密码记录 sql:', insert);
    if (err) {
      console.error('error insert: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};


Account.findByToken = function (token, callback) {
  var sql = 'SELECT * FROM account WHERE token=?';
  connection.query(sql, [token], function(err, rows) {
    console.log('根据token查找找回密码记录: ', sql);
    if (err) {
     console.error('error select: ', err);
      return callback(err);
    }
    callback(null, rows);
  });
};


// 根据邮箱邀请成员
Account.sendMail = function (email, subject, html, callback) {

// 设置邮件内容
  var mailOptions = {
    from: "Fred Foo <1002901669@qq.com>", // 发件地址
    to: email, // 收件列表
    subject: subject, // 标题
    html: html // html 内容
  };

  // 发送邮件
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      callback(error);
    }else{
      console.log("Message sent: " + response.message);
      callback(null,response);
    }
    smtpTransport.close(); // 如果没用，关闭连接池
  });
};



module.exports = Account;