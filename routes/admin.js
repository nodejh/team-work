var Weekly = require('../models/weekly.model');
var Admin = require('../models/admin.model');
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
};

module.exports = routes;
