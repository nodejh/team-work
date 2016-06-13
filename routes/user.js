var config = require('../config/config');
var checkLogin = require('../passport/checkLogin');


var myfun = require('../passport/myfun');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/uploads');
  },
  filename: function (req, file, cb) {
    var extension = file.originalname.slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2);
    cb(null, file.fieldname + '-' + Date.now() + myfun.randomString(5) + '.' + extension);
  }
});
var upload = multer({
  storage: storage
});


var User = require('../models/user.model');
var Folder = require('../models/folder.model');
var File = require('../models/file.model');


var routes = function (app) {


  // 查找当前已登录用户的所有文件夹
  app.post('/api/get_all_folder', checkLogin.checkLoginUserJson);
  app.post('/api/get_all_folder', function (req, res, next) {
    // 查找用户信息
    var email = req.session.user.email;
    User.findUserByEmail(email, function (err, rows) {
      if (err) {
        console.log('查找用户信息失败');
        return res.json({
          code: '1101',
          msg: 'user not found'
        })
      }
      var user = rows[0];
      var user_id = user.id;
      Folder.findFoldersByUserId(user_id, function (err, rows) {
        if (err) {
          return res.json({
            code: 1,
            msg: 'failed'
          });
        }

        return res.json({
          code: 0,
          rows: rows
        });
      });

    });


  });


  // 创建文件夹
  app.post('/api/create_folder', checkLogin.checkLoginUserJson);
  app.post('/api/create_folder', function (req, res, next) {
    var name = req.body.name;

    if (name == undefined || name == '') {
      return res.json({
        code: 1,
        msg: 'name is empty'
      });
    }

    // 查找用户信息
    var email = req.session.user.email;
    User.findUserByEmail(email, function (err, rows) {
      if (err) {
        console.log('查找用户信息失败');
        return res.json({
          code: '1101',
          msg: 'user not found'
        })
      }
      var user = rows[0];
      var user_id = user.id;

      var new_folder = new Folder(user_id, name);
      new_folder.insert(function (err, rows) {

        if (err) {
          console.error('新建文件夹失败', err);
          console.error(new_folder.name, new_folder.user_id);
          return res.json({
            code: 2,
            msg: '新建文件夹失败'
          });
        }

        return res.json({
          code: 0,
          id: rows.insertId,
          msg: 'success'
        });
      });
    });
  });


  // 重命名文件夹
  app.post('/api/rename_folder', checkLogin.checkLoginUserJson);
  app.post('/api/rename_folder', function (req, res, next) {
    var folder_id = req.body.folder_id;
    var name = req.body.name;

    Folder.renameById(folder_id, name, function (err, rows) {
      if (err) {
        return res.json({
          code: 1,
          msg: 'failed'
        });
      }
      return res.json({
        code: 0,
        msg: 'success'
      });
    });
  });


  // 删除文件夹
  ///api/delete_folder
  app.post('/api/delete_folder', checkLogin.checkLoginUserJson);
  app.post('/api/delete_folder', function (req, res, next) {
    var folder_id = req.body.folder_id;

    Folder.deleteById(folder_id, function (err, rows) {
      if (err) {
        return res.json({
          code: 1,
          msg: 'failed'
        });
      }
      console.log('delete_folder folder: ', rows);

      File.deleteByFolderId(folder_id, function (err, rows) {
        if (err) {
          return res.json({
            code: 2,
            msg: 'failed'
          });
        }

        console.log('delete_folder file: ', rows);
        return res.json({
          code: 0,
          msg: 'success'
        });
      });
    });
  });


  // 文件夹详情
  app.get('/folder', checkLogin.checkLoginUserForm);
  app.get('/folder', function (req, res, next) {
    console.log('user info in session:', req.session.user);
    var user_id = req.session.user.id;
    var folder_id = req.query.folder_id;
    res.render('folder', {
      title: '上传文件',
      folder_id: folder_id,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });


  // 上传文件页面
  app.get('/folder_upload', checkLogin.checkLoginUserForm);
  app.get('/folder_upload', function (req, res, next) {
    var folder_id = req.query.folder_id;
    res.render('folder_upload', {
      title: '上传文件',
      user: req.session.user,
      folder_id: folder_id,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });


  // 上传文件操作
  app.post('/folder_upload', checkLogin.checkLoginUserJson);
  app.post('/folder_upload', function (req, res, next) {
    var folder_id = req.query.folder_id;


  });


  // 所有文件夹
  app.post('/all_folder', checkLogin.checkLoginUserJson);
  app.post('/all_folder', function (req, res, next) {
    var user_id = req.session.user.id;



  });


};


module.exports = routes;