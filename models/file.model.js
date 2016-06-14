var connection = require('./db.model');

function File(folder_id, name, path, size) {
  this.folder_id = folder_id;
  this.name = name;
  this.path = path;
  this.size = size;
}


// 插入新的文件夹名
File.prototype.insert = function(callback) {
  var time = parseInt(new Date().getTime() / 1000);
  var data = {
    folder_id: this.folder_id,
    name: this.name,
    path: this.path,
    size: this.size,
    time: time,
    modify_time: time
  };

  var insert = 'INSERT file SET ?';
  connection.query(insert, data, function (err, rows) {
    if (err) {
      console.error('error insert: ' + err.stack);
      return callback(err);
    }
    callback(null, rows);
  });
};


/**
 * 根据folder id查找该文件夹的的所有文件
  * @param folder_id
 * @param callback
 */
File.findFilesByFolderId = function (folder_id, callback) {
  var sql = 'SELECT * FROM file WHERE folder_id=?';
  connection.query(sql, [folder_id], function (err, rows) {

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
 * @param callback
 */
File.renameById = function (id, name, callback) {
  var time = parseInt(new Date().getTime() / 1000);
  var sql = 'UPDATE file SET name=?,modify_time WHERE id=?';
  connection.query(sql, [name, time, id], function (err, rows) {
    if (err) {
      console.error('error UPDATE: ' + err);
      return callback(err);
    }

    callback(null, rows);
  });

};


/**
 * 根据file id 删除某个文件
 * @param id
 * @param callback
 */
File.deleteById = function (id, callback) {

  var sql = 'DELETE FROM file WHERE id=?';
  connection.query(sql, [id], function (err, rows) {
    if (err) {
      console.error('error DELETE: ' + err);
      return callback(err);
    }
    callback(null, rows);
  });

};


/**
 * 根据folder id 删除某个文件文件夹的所有文件
 * @param folder_id
 * @param callback
 */
File.deleteByFolderId = function (folder_id, callback) {

  var sql = 'DELETE FROM file WHERE folder_id=?';
  connection.query(sql, [folder_id], function (err, rows) {
    if (err) {
      console.error('error DELETE: ' + err);
      return callback(err);
    }
    callback(null, rows);
  });

};














module.exports = File;