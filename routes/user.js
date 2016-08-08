var crypto = require('crypto');
var path = require('path');
//var formidable = require('formidable');
var fs = require('fs');
var formidable = require('express-formidable');

var config = require('../config/config');
var checkLogin = require('../passport/checkLogin');


var myfun = require('../passport/myfun');
//var multer = require('multer');
//var storage = multer.diskStorage({
//  destination: function (req, file, cb) {
//    cb(null, __dirname + '/../public/uploads');
//  },
//  filename: function (req, file, cb) {
//    var extension = file.originalname.slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2);
//    cb(null, file.fieldname + '-' + Date.now() + myfun.randomString(5) + '.' + extension);
//  }
//});
//var upload = multer({
//  storage: storage
//});


var User = require('../models/user.model');
var Folder = require('../models/folder.model');
var File = require('../models/file.model');


var routes = function (app) {

  app.use(formidable.parse({
    uploadDir: __dirname + '/../public/folders/',
    keepExtensions: true
  }));

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
    var folder_id = req.query.folder_id;

    Folder.findById(folder_id, function (err, folder_info) {

      if (err) {
        req.flash('error', '打开文件夹失败,请重试');
        return res.redirect('/projectindex');
      }

      File.findFilesByFolderId(folder_id, function (err, rows) {
        if (err) {
          req.flash('error', '打开文件夹失败,请重试');
          return res.redirect('/projectindex');
        }

        res.render('folder', {
          title: '上传文件',
          folder_id: folder_id,
          folder_info: folder_info[0],
          user: req.session.user,
          files: rows,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });

      });
    });


  });


  // 上传文件操作
  app.post('/api/file_upload', checkLogin.checkLoginUserJson);
  app.post('/api/file_upload', function (req, res, next) {

    var folder_id = req.body.folder_id;
    var file = req.body.uploads;
    var name = file.name;
    var path = file.path.substr(file.path.lastIndexOf('/') + 1);
    var size = file.size;
     console.log('uploads: ', req.body.uploads);
    // 将输入存入数据库
    var new_file = new File(folder_id, name, path, size);
    new_file.insert(function(err, rows) {

      if (err) {
        console.log('upload save to db error: ', err);
        res.json({
          code: 1,
          msg: 'upload error'
        });
      }

      res.json({
        code: 0,
        msg: 'upload success'
      });
    });
  });



  // 删除文件
  app.get('/file/delete/:id/:folder_id', checkLogin.checkLoginUserForm);
  app.get('/file/delete/:id/:folder_id', function (req, res, next) {
    var id = req.params.id;
    var folder_id = req.params.folder_id;
    File.deleteById(id, function (err, rows) {
      if (err) {
        req.flash('error', '删除失败,请重试!');
        return res.redirect('/folder?folder_id=' + folder_id);
      }
      req.flash('success', '删除成功!');
      return res.redirect('/folder?folder_id=' + folder_id);
    });
  });



  // 所有文件夹
  //app.get('/all_folder', checkLogin.checkLoginUserJson);
  //app.get('/all_folder', function (req, res, next) {
  //  var user_id = req.session.user.id;
  //
  //
  //});



  // 用户个人资料
  app.get('/profile', checkLogin.checkLoginUserForm);
  app.get('/profile', function (req, res, next) {

    var user_id = req.session.user.id;
    User.findUserById(user_id, function (err, rows) {

      if (err) {
        req.flash('error', '查找用户个人资料失败,请重试');
        return res.redirect('/projectindex');
      }
      
      console.log('个人资料:' + JSON.stringify(rows[0]));
      return res.render('profile', {
        title: rows[0].name + '的个人资料',
        user: req.session.user,
        profile: rows[0],
        error: req.flash('error').toString(),
        success: req.flash('success').toString()
      });
    });
  });


  // 修改资料
  app.post('/profile', checkLogin.checkLoginUserJson);
  app.post('/profile', function (req, res, next) {
    var name = req.body.name;
    if (name == undefined || name == '') {
      req.flash('error', '姓名不能为空');
      return res.redirect('/profile');
    }
    var user_id = req.session.user.id;
    User.updateName(user_id, name, function (err, rows) {
      if (err) {
        req.flash('error', '修改姓名失败,请重试');
        return res.redirect('/profile');
      }
      req.session.user.name = name;
      req.flash('success', '修改成功!');
      return res.redirect('/profile');

    });

  });


  // 修改头像
  app.post('/api/avatar_upload', checkLogin.checkLoginUserJson);
  app.post('/api/avatar_upload', function (req, res, next) {
    var file = req.body.avatar;
    var name = file.name;
    var path = file.path.substr(file.path.lastIndexOf('/') + 1);
    console.log(name);
    console.log(path);

    var user_id = req.session.user.id;
    User.updateAvatar(user_id, path, function (err, rows) {

      if (err) {
        return res.json({
          code: 1,
          msg: 'upload avatar error'
        });
      }

      res.json({
        code: 0,
        msg: 'upload success'
      });

    });
  });
  
  
  // 修改密码
  app.get('/update_password', checkLogin.checkLoginUserForm);
  app.get('/update_password', function (req, res, next) {
    res.render('update_password', {
      title: '修改密码',
      user: req.session.user,
      error: req.flash('error').toString(),
      success: req.flash('success').toString()
    });
  });


  // 修改密码操作
  app.post('/update_password', checkLogin.checkLoginUserJson);
  app.post('/update_password', function (req, res, next) {
    var password_old = req.body.password_old;
    var password_new = req.body.password_new;

    var user_id = req.session.user.id;
    var md5 = crypto.createHash('md5');

    // 判断旧密码是否正确
    User.findPasswordByUserId(user_id, function (err, rows) {

      if (err || !rows[0]) {
        req.flash('error', '修改密码失败,请重试!');
        return res.redirect('/update_password');
      }

      console.log('原密码:' + rows[0].password);
      if (rows[0].password != md5.update(password_old).digest('hex')) {
        req.flash('error', '原密码错误,请重试!');
        return res.redirect('/update_password');
      }


      var password = crypto.createHash('md5').update(password_new).digest('hex');
      console.log(password);
      User.updatePasswordByUserId(user_id, password, function (err, rows) {

        if (err) {
          req.flash('error', '修改密码失败,请重试!');
          return res.redirect('/update_password');
        }

        req.flash('success', '修改密码成功!');
        res.redirect('/update_password');

      });

    });

  });


  app.get('/profile_task', checkLogin.checkLoginUserForm);
  app.get('/profile_task', function (req, res, next) {
    res.render('/profile_task', {

    });
  });






};


module.exports = routes;