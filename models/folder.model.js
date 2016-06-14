var connection = require('./db.model');

function Folder(user_id, name) {
  this.user_id = user_id;
  this.name = name;
}


// 插入新的文件夹名
Folder.prototype.insert = function(callback) {
  var time = parseInt(new Date().getTime() / 1000);
  var data = {
    user_id: this.user_id,
    name: this.name,
    time: time,
    modify_time: time
  };

  var insert = 'INSERT folder SET ?';
  connection.query(insert, data, function (err, rows) {
    if (err) {
      console.error('error insert: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};


/**
 * 根据user_id查找用户的所有文件夹
  * @param user_id
 * @param callback
 */
Folder.findFoldersByUserId = function (user_id, callback) {
  var sql = 'SELECT * FROM folder WHERE user_id=?';
  connection.query(sql, [user_id], function (err, rows) {

    if (err) {
      console.error('error SELECT: ' + err);
      return callback(err);
    }

    callback(null, rows);
  });
};


/**
 * 重命名
 * @param id
 * @param name
 */
Folder.renameById = function (id, name, callback) {
  var sql = 'UPDATE folder SET name=? WHERE id=?';
  connection.query(sql, [name, id], function (err, rows) {
    if (err) {
      console.error('error UPDATE: ' + err);
      return callback(err);
    }
    callback(null, rows);
  });

};


/**
 * 删除某个文件夹
 * @param id
 * @param callback
 */
Folder.deleteById = function (id, callback) {

  var sql = 'DELETE FROM folder WHERE id=?';
  connection.query(sql, [id], function (err, rows) {
    if (err) {
      console.error('error DELETE: ' + err);
      return callback(err);
    }
    callback(null, rows);
  });
};


Folder.findById = function (id, callback) {
  var sql = 'SELECT * FROM folder WHERE id=?';
  connection.query(sql, [id], function (err, rows) {
    if (err) {
      console.error('error SELECT: ' + err);
      return callback(err);
    }
    callback(null, rows);
  });
};


//Folder.findFoldersByIdAndUserId = function (id, user_id, callback) {
//  var sql = 'SELECT * FROM folder WHERE id=? AND user_id=? ORDER BY id';
//  connection.query(sql, [id, user_id], function (err, rows) {
//    if (err) {
//      console.error('error SELECT: ' + err);
//      return callback(err);
//    }
//    callback(null, rows);
//  });
//};





module.exports = Folder;