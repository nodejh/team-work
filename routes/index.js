var crypto = require('crypto');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/uploads');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({storage: storage});

// var multer  = require('multer');
// var upload = multer({ dest: __dirname + '/../public/uploads/' });

var checkLogin = require('../passport/checkLogin');

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
  app.post('/upload', upload.single('weekly'), function (req, res) {
    var file = req.file;
    console.log(req.file);
    console.log(req.body);
    req.flash('success', '上传成功!');
    res.redirect('/upload');
  });



};



module.exports = routes;
