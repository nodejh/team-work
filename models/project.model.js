var connection = require('./db.model');
var sendMail =require('./mail.model');
function Project(name,description,checkbox,ssl,manager_id) {
  this.name = name;
  this.description = description;
  this.checkbox = checkbox;
  this.manager_id =manager_id;
  this.ssl =ssl;
}


// 向项目数据库插入新用户
Project.prototype.insert = function (callback) {
  var time = parseInt(new Date().getTime() / 1000);
  console.log(this.checkbox);
  console.log(this.manager_id);
  var data = {
      name: this.name,
      description: this.description,
      checkbox:this.checkbox,
      manager_id: this.manager_id,
      time: time,
       ss:this.ssl
  };

  var insert = 'INSERT project SET ?';
  connection.query(insert, data, function (err, rows) {
    if (err) {
      console.error('error insert: ' + err.stack);
      return callback(err);
    }

    callback(null, rows);
  });

};

// 向数据库插入新用户
Project.insertmap = function (data,callback) {

   var insert2 = 'INSERT project_member SET ?';
  connection.query(insert2, data, function (err, rows) {
    if (err) {
      console.error('error insert: ' + err.stack);
      return callback(error);
    }

    callback(null, rows);
  });

};
// 根据名字查找项目
Project.prototype.findUserByName = function (name, callback) {
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return callback(error);
    }

    console.log('connected as id ' + connection.threadId);
    var select = 'SELECT * FROM project WHERE name=?';
    connection.query(select,function (err, rows) {
      if (err) {
        console.error('error select: ' + err.stack);
        return callback(error);
      }

      callback(null, rows);
    });
  });
};

// 根据 user_id 查找项目
Project.findByUserIdandname = function (user_id,name, callback) {
  var sql = 'SELECT * FROM project WHERE manager_id=? AND name=?';
  connection.query(sql, [user_id,name], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
}


// 根据 user_id 查找项目
Project.findByUserIdandssl = function (user_id,ssl, callback) {
  var sql = 'SELECT * FROM project_member WHERE user_id=? AND ss=?';
  connection.query(sql, [user_id,ssl], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
}
// 根据 user_id 查找项目
Project.findByEmail = function (email, callback) {
  var sql = 'SELECT * FROM user WHERE email=?';
  connection.query(sql, [email], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
}


// 根据 user_id 查找项目
Project.updateAccept = function (project, callback) {
  var sql = 'UPDATE project_member SET  accept=? WHERE user_id=? AND ss=? ';
  connection.query(sql, [1,project.user_id,project.ss], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
}


Project.Modify = function (description,checkbox,ssl, callback) {
  var sql = 'UPDATE project SET  description=?,checkbox=? WHERE ss=? ';
  connection.query(sql, [description,checkbox,ssl], function (err, rows) {
    if (err) {
      console.error('error UPDATE: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
}

// 根据 user_id 查找项目
Project.findByUserId = function (user_id, callback) {
  var sql = 'SELECT * FROM project_member WHERE user_id=?';
  connection.query(sql, [user_id], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
}
// 根据 user_id 查找项目
Project.findByUserId2 = function (user_id, callback) {
  var sql = 'SELECT * FROM project WHERE  manager_id=?';
  connection.query(sql, [user_id], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};

// 根据邮箱邀请成员
Project.prototype.inviteMember = function (email, ssl,callback) {
console.log(email);
// 设置邮件内容
    var subject= "成员邀请"; // 标题
     var html= "<p>请点击<a href='localhost:4000/check?ssl="+ssl+"'>同意</a>加入团队"+this.name+",此链接24小时后失效</p>" ;// html 内容
// 发送邮件
  sendMail(email,subject,html, function callback(error, response){
    if(error){
      console.log(error+email);
      callback(error);
    }else{
      console.log("Message sent: " +email);
      callback(null,response);
    }
    smtpTransport.close(); // 如果没用，关闭连接池
  });
};

Project.findBySSL= function (ssl, callback) {
  var sql = 'SELECT * FROM project WHERE ss=?';
  connection.query(sql,[ssl], function (err, rows) {
    console.log(sql);
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};

Project.deleteMember=function (user_id,ssl,callback) {
  var sql = 'DELETE FROM project_member WHERE user_id=? AND ss=?';
  connection.query(sql, [user_id, ssl], function (err, rows) {
    if (err) {
      console.error('error DELETE: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};

Project.findBySSL2=function (ssl, callback) {
  var sql = 'SELECT * FROM project_member WHERE ss=? AND accept=1';
  connection.query(sql,[ssl], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
}


Project.deleteProject=function (ssl,callback) {
    var sql = 'DELETE FROM project WHERE ss=?';
    connection.query(sql, [ssl], function (err, rows) {
        if (err) {
            console.error('error DELETE: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
Project.deleteProjectMember=function (ssl,callback) {
    var sql = 'DELETE FROM project_member WHERE ss=?';
    connection.query(sql, [ssl], function (err, rows) {
        if (err) {
            console.error('error DELETE: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};
module.exports = Project;