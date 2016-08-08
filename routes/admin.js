var Weekly = require('../models/weekly.model');
var Admin = require('../models/admin.model');
var Folder = require('../models/folder.model');
var File = require('../models/file.model');
var routes = function (app) {



  app.get('/admin', function (req, res) {
    res.redirect('/admin/users');
    // res.render('admin_index', {
    //   title: '管理员后台'
    // });
  });


  app.get('/admin_login', function (req, res) {
    res.render('admin_login', {
      title: '管理员登录'
    });
  });


  app.post('/admin_login', function (req, res) {
   var user =req.body.user;
    var password =req.body.password;
    console.log(password);
   Admin.findUserByName(user,function (err,result) {
     if(err){
       console.log(err);
       return res.redirect=('/admin_login');

     }
     console.log(result);
     if(password==result[0].password){
       return res.redirect('/admin');
     }
     return res.redirect('/admin_login');
   }) ;
  });

  // 查看所有周报
  app.get('/admin/weekly', function (req, res) {
    Weekly.findAll(function (err, rows) {
      if (err) {
        console.log('error 查看所有周报', err);
        return next(err);
      }
      res.render('admin_weekly', {
        title: '所有周报',
        error: '',
        success: '',
        user: {
          name: '管理员'
        },
        weeklys: rows
      });
    });
  });



  app.get('/admin/folder', function (req, res) {

    Admin.getAllFolder(function (err, rows) {
      if (err) {
       console.log('error 查看所有文件夹失败!', err);
        return next(err);
      }
      // Admin.getUser();
      res.render('admin_folder', {
        title: '所有文件夹',
        error: '',
        success: '',
        user: {
          name: '管理员'
        },
        folders: rows
      });
    });
  });


  // 查询所有用户
  app.get('/admin/users', function (req, res) {
    Admin.getUsers(function (err, rows) {

      if (err) {
        return next(err);
      }
      res.render('admin_users', {
        title: '所有用户',
        error: '',
        success: '',
        user: {
          name: '管理员'
        },
        users: rows
      });
    });
  });





  // API
  app.post('/api/admin/user_folder', function (req, res) {
    var user_id = req.body.user_id;
    Folder.findFoldersByUserId(user_id, function (err, rows) {
      if (err) {
        console.log('error select folder: ', err);
        return res.json({
          code: 1,
          msg: err
        });
      }
      res.json({
        code: 0,
        data: {
          folders: rows
        }
      });
    });
  });

  app.post('/api/admin/files_in_folder', function (req, res) {
    var folder_id = req.body.folder_id;
    File.findFilesByFolderId(folder_id, function (err, rows) {
      if (err) {
        console.log('error select file: ', err);
        return res.json({
          code: 1,
          msg: err
        });
      }
      res.json({
        code: 0,
        data: {
          files: rows
        }
      });
    });
  });


};

module.exports = routes;
