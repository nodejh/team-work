var crypto = require('crypto');
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
var upload = multer({storage: storage});
var checkLogin = require('../passport/checkLogin');
var Weekly = require('../models/Weekly');




var routes = function (app) {


  // 首页
  app.get('/', function (req, res) {
    res.redirect('/index');
  });
  app.get('/index', function (req, res) {
    res.render('index', {
      title: '首页'
    });
  });


  // 登录页面
  app.get('/login', checkLogin.checkNotLoginUserForm);
  app.get('/login', checkLogin.checkNotLoginAdminForm);
  app.get('/login', function (req, res) {
    res.render({
      title: '登录',
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });


  // 注册页面
  app.get('/register', checkLogin.checkNotLoginUserForm);
  app.get('/register', checkLogin.checkNotLoginAdminForm);
  app.get('/register', function (req, res) {
    res.render({
      title: '注册',
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });


  // 上传周报页面
  // app.get('/upload', checkLogin.checkLoginUserForm);
  app.get('/upload', function (req, res) {
    res.render('upload', {
      title: '上传周报',
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });


  // 上传周报操作
  //app.post('/upload', checkLogin.checkLoginUserForm);
  var uploadWeekly = upload.single('weekly');
  app.post('/upload', function (req, res) {
    uploadWeekly(req, res, function (err) {
      if (err) {
        console.log('上传周报失败：', err);
        req.flash('error', '上传成功!');
        res.redirect('/upload');
      }

      var title = req.body.title;
      var filename = req.file.filename;

      var weekly = new Weekly(title, filename);
      weekly.upload(function (err) {
        if (err) {
          req.flash('error', '上传失败，请重试!');
          return res.redirect('/upload');
        }
        // upload success
        req.flash('success', '上传成功!');
        res.redirect('/upload');
      });



    });


  });



};



module.exports = routes;
