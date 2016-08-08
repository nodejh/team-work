var async = require('async');
var connection = require('./db.model');
function Admin() {
}


// 根据邮箱查找用户
Admin.findUserByName = function (name, callback) {

  var select = 'SELECT * FROM admin WHERE name=?';
  connection.query(select, [name], function (err, rows) {
    if (err) {
      console.error('error select: ' + err.stack);
      return callback(err);
    }

    callback(null, rows);
  });
};


// 查找所有文件夹
Admin.getAllFolder = function (callback) {

  var sql = 'SELECT ' +
    '`folder`.`id`,' +
    '`folder`.`modify_time`,' +
    '`folder`.`name`, ' +
    '`folder`.`time`, ' +
    '`folder`.`user_id`, ' +
    '`user`.`email`, ' +
    '`user`.`name` AS user_name ' +
    'FROM `folder` ' +
    'LEFT JOIN `user` ' +
    'ON `user`.`id`=`folder`.`user_id`';
  connection.query(sql, function (err ,rows) {

    if (err) {
      console.log('error select folders: ', err);
      return callback(err);
    }
    callback(null, rows);
  });
};


// 获取所有用户及其文件夹等信息
// Admin.getUser = function (callback) {
//
//   var users_list = [];
//   var sql = 'select * from user';
//   connection.query(sql, function (err, users) {
//
//     if (err) {
//       console.log('error select user', err);
//       return callback(err);
//     }
//
//     async.map(users, function (user) {
//
//       var sql_folder = 'SELECT ' +
//         '`folder`.`id` AS folder_id, ' +
//         '`folder`.`name` AS folder_name, ' +
//         '`folder`.`time` AS folder_time ' +
//         'FROM `folder` ' +
//         'WHERE `folder`.`user_id`=?';
//       connection.query(sql_folder, [user.id], function (err, folders) {
//         if (err) {
//           console.log('error select folder:', err);
//           // return callback(err);
//           return err;
//         }
//
//         // user.folders = folders;
//
//         async.map(folders, function (folder, index) {
//           var select_file = 'SELECT ' +
//             '`file`.`name` AS file_name, ' +
//             '`file`.`path` AS file_path, ' +
//             '`file`.`size` AS file_size, ' +
//             '`file`.`time` AS file_time ' +
//             'FROM `file` ' +
//             'WHERE ' +
//             '`file`.`folder_id`=?';
//           connection.query(select_file, [folder.folder_id], function (err, rows) {
//             if (err) {
//               console.log('error select_file:', err);
//               return err;
//             }
//
//             folder.files = rows;
//             user.folder = [];
//             user.folder.push(folder);
//
//             //user.folder[index].files = rows;
//             // console.log('user: ', user);
//             users_list.push(user);
//             return users_list;
//           });
//         }, function (err, res) {
//           return res;
//         });
//       });
//     }, function (err, res) {
//       console.log('rrrr');
//       console.log(err);
//       console.log(res);
//     });
//   });
// };



Admin.getUsers = function (callback) {

  var sql = 'select * from user';
  connection.query(sql, function (err, res) {

    if (err) {
      console.log('select user error', err);
      return callback(err);
    }

    callback(null, res);

  });

};



Admin.getFoldersByUserId = function (callback) {

  var sql = 'select * from user';
  connection.query(sql, function (err, res) {

    if (err) {
      console.log('select user error', err);
      return callback(err);
    }

    callback(null, res);

  });

};



module.exports = Admin;