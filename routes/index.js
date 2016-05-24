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
var upload = multer({
  storage: storage
});
var checkLogin = require('../passport/checkLogin');
var Weekly = require('../models/weekly.model');
var User = require('../models/user.model');

var routes = function (app) {

  // 首页
  app.get('/', function (req, res) {
    if (req.session.user) {
      res.redirect('/home');
    } else {
      res.redirect('/index');
    }
  });
  app.get('/index', function (req, res) {
    res.render('index', {
      title: '首页'
    });
  });

  // 用户主页
  app.get('/home', checkLogin.checkLoginUserForm);
  app.get('/home', function (req, res) {

    // 查找用户信息
    var email = req.session.user.email;
    User.findUserByEmail(email, function(err, rows) {
      if (err) {
        console.log('查找用户信息失败');
        return next(err);
      }
      var user = rows[0];
      // 查找改用户的周报
      var user_id = user.id;
      Weekly.findByUserId(user_id, function (err, weeklys) {
        if (err) {
          console.log('查找用户周报信息失败');
          return next(err);
        }
        res.render('home', {
          title: '主页',
          user: user,
          weeklys: weeklys,
          error: req.flash('error').toString()
        });
      });
    });
  });


  // 登录页面
  app.get('/login', checkLogin.checkNotLoginUserForm);
  app.get('/login', checkLogin.checkNotLoginAdminForm);
  app.get('/login', function (req, res) {
    res.render('login', {
      title: '登录',
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

  // 登陆操作
  app.post('/login', checkLogin.checkNotLoginUserForm);
  app.post('/login', checkLogin.checkNotLoginAdminForm);
  app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (!myfun.checkEmail(email)) {
      req.flash('error', '邮箱格式错误!');
      return res.redirect('/login');
    }
    if (password.length < 6) {
      req.flash('error', '密码错误!');
      return res.redirect('/login');
    }
    
    User.findUserByEmail(email, function (err, rows) {
      if (err) {
        req.flash('error', '登陆失败, 请重试!');
        return res.redirect('/login');
      }

      if (rows.length === 0) {
        req.flash('error', '用户不存在!');
        return res.redirect('/login');
      }

      if (rows.length != 1) {
        req.flash('error', '账号异常!');
        return res.redirect('/login');
      }

      // 将密码加密
      var md5 = crypto.createHash('md5');
      password = md5.update(req.body.password).digest('hex');
      if (password == rows[0].password) {
        // 登陆成功,将用户信息存入 session
        req.session.user = rows[0];
        res.redirect('/home');
      }
    });
  });

  // 注册页面
  app.get('/register', checkLogin.checkNotLoginUserForm);
  app.get('/register', checkLogin.checkNotLoginAdminForm);
  app.get('/register', function (req, res) {
    res.render('register', {
      title: '注册',
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

  // 注册操作
  app.post('/register', checkLogin.checkNotLoginUserForm);
  app.post('/register', checkLogin.checkNotLoginAdminForm);
  app.post('/register', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var re_password = req.body.re_password;
    if (!name) {
      req.flash('error', '昵称不能为空!');
      return res.redirect('/register');
    }
    if (!myfun.checkEmail(email)) {
      req.flash('error', '邮箱格式错误!');
      return res.redirect('/register');
    }
    if (password.length < 6) {
      req.flash('error', '密码长度不能小于6位');
      return res.redirect('/register');
    }
    if (password != re_password) {
      req.flash('error', '两次密码不一致');
      return res.redirect('/register');
    }

    // 将密码加密
    var md5 = crypto.createHash('md5');
    password = md5.update(req.body.password).digest('hex');
    var newUser = new User(name, email, password);
    // 检查是否已经注册过
    //noinspection JSUnresolvedFunction
    User.findUserByEmail(newUser.email, function (err, rows) {
      if (err) {
        console.log('error 检查是否已经注册过', err);
        req.flash('error', '注册失败, 请重试!');
        return res.redirect('/register');
      }
      if (rows.length > 0) {
        req.flash('error', '该邮箱已注册, 您可以直接登陆!');
        return res.redirect('/register');
      }
      console.log('注册...将用户信息写入数据库...');
      newUser.insert(function (err, inserted) {
        if (err) {
          console.log('error newUser.insert', err);
          req.flash('error', '注册失败, 请重试!');
          return res.redirect('/register');
        }

        // 注册成功，将用户信息写入session
        console.log('注册成功, id 为: ', inserted.insertId);
        req.session.user = {
          id: inserted.insertId,
          name: name,
          email: email,
          password: password,
          type: 1
        };
        res.redirect('/home');
      });
    });
  });


  // 退出登录
  app.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/');
  });


  // 上传周报页面
  app.get('/upload', checkLogin.checkLoginUserForm);
  app.get('/upload', function (req, res) {
    // 查找用户信息
    var email = req.session.user.email;
    User.findUserByEmail(email, function(err, rows) {
      if (err) {
        console.log('查找用户信息失败');
        return next(err);
      }
      var user = rows[0];
      res.render('upload', {
        title: '上传周报',
        user: user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });

    });

  });

  // 上传周报操作
  app.post('/upload', checkLogin.checkLoginUserForm);
  var uploadWeekly = upload.single('weekly');
  app.post('/upload', function (req, res) {
    uploadWeekly(req, res, function (err) {
      if (err) {
        console.log('上传周报失败：', err);
        req.flash('error', '上传成功!');
        res.redirect('/upload');
      }

      var title = req.body.title;
      var week = req.body.week;
      var filename = req.file.filename;
      var user_id = req.session.user.id;
      var weekly = new Weekly(title, week, filename);
      weekly.upload(user_id, function (err, rows) {
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
