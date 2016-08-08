var Weekly = require('../models/weekly.model');
var Admin = require('../models/admin.model');
var connection = require('../models/db.model');
var Topics = require('../models/topics.model');
var Commit = require('../models/commit.model');
var Todo = require('../models/todo.model');
var Project = require('../models/project.model');
var Excel =require('../models/excel.model');
var Folder = require('../models/folder.model');
var File = require('../models/file.model');
var routes = function (app) {

  app.get('/admin', function (req, res) {

    res.render('admin_index', {
       title: '管理员后台'
     });
  });


  app.get('/admin_login', function (req, res) {
    res.render('admin_login', {
      title: '管理员登录'
    });
  });

  app.get('/statistic', function (req, res) {
    res.render('statistic', {
      title: '统计'
    });
  });

  app.post('/admin_login', function (req, res) {
    var user = req.body.user;
    var password = req.body.password;
    console.log(password);
    Admin.findUserByName(user, function (err, result) {
      if (err) {
        console.log(err);
        return res.redirect = ('/admin_login');

      }
      console.log(result);
      if (password == result[0].password) {
        return res.redirect('/admin');
      }
      return res.redirect('/admin_login');
    });
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




  app.post('/project_find', function (req, res) {

    var where = "";
    var fromId = req.body.from_id;
    var toId = req.body.to_id;
    var TimeFrom = req.body.time_from;
    var TimeTo = req.body.time_to;
    var id = req.body.id;
    var date11=new Date(TimeFrom);
    var date1=parseInt(date11.getTime()/1000);
    var date21=new Date(TimeTo);
    var date2=parseInt(date21.getTime()/1000);
    console.log(date1);
    console.log(date2);
    // 检查勾选了哪些checkbox
    var queryCheck = req.body.query_check;
    console.log(queryCheck);
    if (queryCheck != null) {
      for (var i = 0; i < queryCheck.length; i++) {
        if (queryCheck[i] == "id") {
          if ((toId != "") && (fromId != "")) {
            if (where != "") {
              where = where + " AND ";
            }
            where = where + "project_id>" + fromId;
            where = where + " AND project_id<" + toId;
          }
        }
        if (queryCheck[i] == "device_name") {
          if (id != "") {
            if (where != "") {
              where = where + " AND ";
            }
            where = where + "manager_id LIKE '%" + id + "%'";
          }
        }
        if (queryCheck[i] == "gps_time") {
          if ((TimeTo != "") && (TimeFrom != "")) {
            if (where != "") {
              where = where + " AND ";
            }
            where = where + "time>'" + date1 + "'";
            where = where + " AND time<'" + date2 + "'";
          }
        }
      }
      if (where != "") {
        where = " SELECT * FROM project WHERE " + where;
        console.log(where);
        connection.query(where, function (err, rows) {
          if (err) {
            console.log('error insert: ' + err.stack);
          }
          console.log(rows);
          res.render('admin_count', {
            title: '查询结果',
            result: rows
          });
        });
      }

    }
  });

  app.post('/statistic', function (req, res) {

    var where = "";
    var fromId = req.body.from_id;
    var toId = req.body.to_id;
    var TimeFrom = req.body.time_from;
    var TimeTo = req.body.time_to;
    var id = req.body.id;
    var date11=new Date(TimeFrom);
    var date1=parseInt(date11.getTime()/1000);
    var date21=new Date(TimeTo);
    var date2=parseInt(date21.getTime()/1000);
    console.log(date1);
    console.log(date2);
    // 检查勾选了哪些checkbox
    var queryCheck = req.body.query_check;
    console.log(queryCheck);
    if (queryCheck != null) {
      for (var i = 0; i < queryCheck.length; i++) {
        if (queryCheck[i] == "id") {
          if ((toId != "") && (fromId != "")) {
            if (where != "") {
              where = where + " AND ";
            }
            where = where + "project_id>" + fromId;
            where = where + " AND project_id<" + toId;
          }
        }
        if (queryCheck[i] == "device_name") {
          if (id != "") {
            if (where != "") {
              where = where + " AND ";
            }
            where = where + "manager_id LIKE '%" + id + "%'";
          }
        }
        if (queryCheck[i] == "gps_time") {
          if ((TimeTo != "") && (TimeFrom != "")) {
            if (where != "") {
              where = where + " AND ";
            }
            where = where + "time>'" + date1 + "'";
            where = where + " AND time<'" + date2 + "'";
          }
        }
      }
      if (where != "") {
        where = " SELECT * FROM project WHERE " + where;
        console.log(where);
        connection.query(where, function (err, rows) {
          if (err) {
            console.log('error insert: ' + err.stack);
          }
          console.log(rows);
          res.render('statistic_result', {
            title: '统计结果',
            result: rows
          });
        });
      }

    }
  });
  app.get('/delete', function (req, res) {
   console.log(123);
    var ssl = req.query.ssl;
        Project.deleteProject( ssl, function (err1, result) {
          if (err1) {
            req.flash('error', '删除项目出错!');
            return res.redirect('/projectindex');

          }
          Project.deleteProjectMember(ssl,function (err2,result2) {
            if (err2) {
              req.flash('error', '删除项目出错!');
              return res.redirect('/projectindex');

            }


                req.flash('error', '删除项目成功!');
                return res.redirect('/admin');
              });
            });
          });
  app.get('/view', function (req, res) {
    var ssl = req.query.ssl;
    Project.findBySSL(ssl, function (err, result) {
      if (err) {
        req.flash('error', '查找出错!');
        return res.redirect('/projectindex');
      }

      if (result.length > 0) {
        
          console.log(result);
          res.render('view', {
            title: '单个查看结果',
            user: req.session.user,
            project: result[0],
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
          });

      }
      else {
        // console.log(result[0].ss);
        req.flash('error', '该项目不存在或已删除!');
        res.redirect('/projectindex');
      }

    });

  });
  app.get('/export', function (req, res) {

    var ssl = req.query.ssl;

    Project.findBySSL(ssl, function (err, projects) {
      if (err) {
        return res.redirect('/admin');
      }
      if (projects.length == 0) {
        req.flash('error', '该项目不存在或已删除!');
        return res.redirect('/projectindex');

      }
      console.log(projects);
      console.log(projects[0].project_id);

      Todo.findByProjectId(projects[0].project_id,function (err3,result3) {
        if (err3) {
          req.flash('error', '导出项目出错!');
          return res.redirect('/projectindex');

        }
        var conf={};
        if(result3.length>0)
        {
          conf.cols=[
            {caption:'项目名称', type:'string'},
            {caption:'任务承担者', type:'string'},
            {caption:'任务内容', type:'string'},
            {caption:'截止时间', type:'string'},
            {caption:'是否完成', type:'string'}
          ];
          var str="[";
          var i=0;
          console.log(result3);
          var data =new Array();
          for(i=0;i<result3.length;i++)
          {
            data[i] =new Array();
            var date = new Date(result3[i].finish_time);
            data[i].push(projects[0].name);
            data[i].push(result3[i].user_name);
            data[i].push(result3[i].content);
            data[i].push(date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate());
            if(result3[i].finished)
            {
              data[i].push("是");
            }
            else
            {
              data[i].push("否");
            }
          }


          conf.rows=data;
          console.log(conf);
        }
        console.log(str);

        var excel = new Excel();
        excel.createExcel({
          data:conf,
          savePath:__dirname + '/../public/uploads/excel',
          cb:function(path){
            excel.download(path,req, res,true);
          }
        });
      });
    });
  });
};
module.exports = routes;
