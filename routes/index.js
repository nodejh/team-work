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
var config = require('../config/config');
var checkLogin = require('../passport/checkLogin');
var Weekly = require('../models/weekly.model');
var User = require('../models/user.model');
var Project = require('../models/project.model');
var Topics = require('../models/topics.model');
var Account = require('../models/account.model');
var sendMail = require('../models/mail.model');

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
<<<<<<< HEAD
  app.get('/allweekly', checkLogin.checkLoginUserForm);
  app.get('/allweekly', function (req, res,next) {
=======
  app.get('/home', checkLogin.checkLoginUserForm);
  app.get('/home', function (req, res, next) {
>>>>>>> 6f1789cb43e5a515138bb8a61ace1585745961cc

    // 查找用户信息
    var email = req.session.user.email;
    User.findUserByEmail(email, function (err, rows) {
      if (err) {
        console.log('查找用户信息失败');
        return next(err);
      }
      var user = rows[0];
      // 查找改用户的周报
      var user_id = user.id;
      Weekly.findByUserId (user_id, function (err, weeklys) {
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
      req.flash('error', '密码格式错误!');
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
      console.log(password);
      if (password != rows[0].password) {
        // 登陆成功,将用户信息存入 session
        req.flash('error', '密码错误!');
        return res.redirect('/login');
      }
<<<<<<< HEAD
        req.session.user = rows[0];
        res.redirect('/projectindex');
=======
      req.session.user = rows[0];
      res.redirect('/home');
>>>>>>> 6f1789cb43e5a515138bb8a61ace1585745961cc
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


  // 找回密码页面
  app.get('/find_password', function (req, res) {
    res.render('find_password', {
      title: '找回密码',
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });


  // 找回密码操作
  app.post('/find_password', checkLogin.checkNotLoginUserForm);
  app.post('/find_password', checkLogin.checkNotLoginAdminForm);
  app.post('/find_password', function (req, res) {
    // 发送邮件成功后,进入到重置密码页面
    var email = req.body.email;
    if (!myfun.checkEmail(email)) {
      req.flash('error', '邮箱格式错误!');
      return res.redirect('/find_password');
    }

    // 查看改邮箱是否是系统用户
    User.findUserByEmail(email, function (err, rows) {
      if (err) {
        console.log('error 检查是否已经注册过', err);
        req.flash('error', '发送邮件失败, 请重试!');
        return res.redirect('/find_password');
      }

      if (rows.length == 0) {
        console.log('该邮箱尚未注册', err);
        req.flash('error', '该邮箱尚未注册, 您可以直接注册!');
        return res.redirect('/find_password');
      }

      // 将数据存入数据库,然后发送邮件
      // 先将时间戳 hash,再与随即字符串拼接,得到唯一字符串
      var time = new Date().getTime();
      var md5 = crypto.createHash('md5');
      var token = md5.update(time.toString()).digest('hex') + myfun.randomString(20);

      console.log('token:', token);
      var newAccount = new Account(email, token);
      newAccount.insert(function (err, insert) {
        if (err) {
          console.log('找回密码时保存acount失败:', err);
          req.flash('error', ' 发送邮件失败,请重试!');
          return res.redirect('/find_password');
        }
        // 发送邮件
        //subject, html
        var url = 'http://' + req.hostname + ":" + config.port + '/reset_password?token=' + token;
        console.log(url);
        var subject = 'Nucleus 你的网上办公,找回密码';
        var html = '点击此链接重置密码<a href="' + url + '" alt="找回密码">' + url + '</a>';
        console.log('htl: ', html);
        sendMail(email, subject, html, function (err, send_res) {

          if (err) {
            console.log('找回密码时发送邮件失败:', err);
            req.flash('error', ' 发送邮件失败,请重试!');
            return res.redirect('/find_password');
          }
          console.log('找回密码时发送邮件成功', send_res);
          req.flash('success', ' 我们已将重置密码的链接发送至您的邮箱' + email + ',链接30分钟后失效,请及时查看!');
          return res.redirect('/find_password');
        });
      });

    });

  });

  // 重置密码页面
  app.get('/reset_password', checkLogin.checkNotLoginUserForm);
  app.get('/reset_password', checkLogin.checkNotLoginAdminForm);
  app.get('/reset_password', function (req, res) {
    var token = req.query.token;
    console.log('reset password token: ' + token);
    res.render('reset_password', {
      title: '重置密码',
      token: token,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });


  // 重置密码操作
  app.post('/reset_password', checkLogin.checkNotLoginUserForm);
  app.post('/reset_password', checkLogin.checkNotLoginAdminForm);
  app.post('/reset_password', function (req, res) {
    var token = req.body.token;
    var password = req.body.password;
    var re_password = req.body.re_password;
    if (password.length < 6) {
      req.flash('error', '密码长度不能小于6位');
      return res.redirect('/reset_password?token=' + token);
    }
    if (password != re_password) {
      req.flash('error', '两次密码不一致');
      return res.redirect('/reset_password?token=' + token);
    }

    Account.findByToken(token, function (err, rows) {

      if (err) {
        console.log('重置密码,查询数据库失败', err);
        req.flash('error', '重置密码链接错误,请重新发送邮件并进入邮箱查看!');
        return res.redirect('/reset_password?token=' + token);
      }

      if (rows.length == 0) {
        req.flash('error', '重置密码链接错误,请重新发送邮件并进入邮箱查看!');
        return res.redirect('/reset_password?token=' + token);
      }

      // 判断时间是否过期
      var current_time = parseInt(new Date().getTime() / 1000);
      var difference = config.difference_time;
      if (rows[0].time + difference < current_time) {
        console.log('链接已过期');
        req.flash('error', '链接已过期,请重新发送邮件!');
        return res.redirect('/reset_password?token=' + token);
      }

      // 更新密码
      var email = rows[0].email;
      var md5 = crypto.createHash('md5');
      password = md5.update(password).digest('hex');

      User.updatePasswordByEmail(email, password, function (err, rows) {

        if (err) {
          console.error('error update password: ', err);
          req.flash('error', '重置密码失败,请重试!');
          return res.redirect('/reset_password?token=' + token);
        }
        // 重置密码成功
        req.flash('success', '重置密码成功,你可以使用新密码登录!');
        return res.redirect('/reset_password?token=' + token);
      });
    });
  });


  // 退出登录
  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
  });


  // 上传周报页面
  app.get('/upload', checkLogin.checkLoginUserForm);
  app.get('/upload', function (req, res) {
    // 查找用户信息
    var email = req.session.user.email;
    User.findUserByEmail(email, function (err, rows) {
      if (err) {
        console.log('查找用户信息失败');
        return next(err);
      }
      var user = rows[0];
      var user_id = user.id;
      Project.findByUserId(user_id, function (err, project) {
        if (err) {
          console.log('查找用户项目信息失败123');
          return next(err);
        }
        res.render('upload', {
          title: '上传周报',
          user: user,
          project: project,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });

      });
    });
  });

  // 上传周报操作
  app.post('/upload', checkLogin.checkLoginUserForm);
  var uploadWeekly = upload.single('weekly');
  app.post('/upload', function (req, res) {
    uploadWeekly(req, res, function (error) {
      if (error) {
        console.log('上传周报失败：', error);
        req.flash('error', '上传周报失败!');
       return  res.redirect('/weekly');
      }
      var ssl =req.body.ssl;
      var title = req.body.title;
      var week = req.body.week;
      var filename = req.file.filename;
      var user_id = req.session.user.id;
      console.log(ssl);
      var weekly = new Weekly(title, week, filename);
      Project.findBySSL(ssl,function (err1,result1) {
        if (err1) {
          req.flash('error', '上传失败，请重试!');
         return  res.redirect('/weekly?ssl='+ssl);
        }
        // upload success
        console.log(result1);
        weekly.upload(user_id,result1[0].project_id, result1[0].name,function (err, rows) {
        if (err) {
          req.flash('error', '上传失败，请重试!');
          return res.redirect('/upload');
        }
        // upload success
        req.flash('success', '上传成功!');
        res.redirect('allweekly');
      });

      });
     
    });
  });
  // 新建项目页面
  app.get('/newproject', checkLogin.checkLoginUserForm);
  app.get('/newproject', function (req, res) {
    res.render('new-project', {
      title: '新建项目',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });


// 新建项目操作
  app.post('/newproject', checkLogin.checkLoginUserForm);
  app.post('/newproject', function (req, res) {

    var projectname = req.body.project_name;
    var description = req.body.description;
    var checkbox = req.body.checkbox;
    var members = req.body.members;
    var member = JSON.parse(members);
    var manager = req.session.user;
    var str = projectname + manager.id;

    var md5 = crypto.createHash('md5');
<<<<<<< HEAD
    var  ssl = md5.update(str).digest('hex');
   console.log('weewwerwwrrwewsdfsdfffsd');
    Project.findByUserIdandname(manager.id,projectname,function (err1,result1) {
      if(result1.length>0)
      {
          console.log('新建项目失败：', err1);
          req.flash('error', '已存在该项目!');
          return  res.json({
            code:"double"
          });
        }

    //  console.log(result);

    var project =new Project(projectname,description,checkbox,ssl,manager.id);
=======
    var ssl = md5.update(str).digest('hex');
    console.log('weewwerwwrrwewsdfsdfffsd');
    Project.findByUserIdandname(manager.id, projectname, function (err1, result1) {
      if (result1.length > 0) {
        console.log('新建项目失败：', err1);
        req.flash('error', '已存在该项目!');
        return res.redirect('/newproject');
      }
      //  console.log(result);
    });
    var project = new Project(projectname, description, checkbox, ssl, manager.id);
>>>>>>> 6f1789cb43e5a515138bb8a61ace1585745961cc

    project.insert(function (err1, rows) {

      if (err1) {
        console.log('新建项目失败：', err1);
        req.flash('error', '新建项目失败!');
        return res.redirect('/newproject');
      }
    });

    Project.findByUserIdandname(manager.id, projectname, function (err2, result2) {
      if (err2) {
        console.log('新建项目失败：', err);
        req.flash('error', '新建项目失败!');
        return res.redirect('/newproject');
      }
      var data = {
        project_id: result2[0].project_id,
        project_name: result2[0].name,
        ss: result2[0].ss,
        member_type: '1',
        user_id: manager.id,
        accept: 1
      };
      console.log(123);
      Project.insertmap(data, function (err2, rows) {
        if (err2) {
          console.log('新建项目失败：', err2);
          req.flash('error', '新建项目失败!');
          return res.redirect('/newproject');
        }
<<<<<<< HEAD
      }); 
        var maillist="";
        
         for(var i=0;i<member.length;i++) {
           console.log(member.length);
           var role1 = member[i].role;
           var email1 = member[i].email;
           console.log(email1);
           Project.findByEmail(email1, function (err3, result3) {
             if (err3) {
               console.log('新建项目失败：', err);
               req.flash('error', '新建项目失败!');
               return res.redirect('/newproject');
             }
             if (result3.length == 0) {
               req.flash('error', '该邀请成员不存在！!');
               return res.redirect('/newproject');
             }


           var data2 = {
             project_id: result2[0].project_id,
             project_name: result2[0].name,
             ss: result2[0].ss,
             member_type: role1,
             user_id:result3[0].id ,
             accept:0
           };
           console.log(data2);
           Project.insertmap(data2, function (err5, rows2) {
             if (err5) {
               console.log('新建项目失败：', err2);
               req.flash('error', '新建项目失败!');
               return res.redirect('/newproject');
             }
           });
           });       
           maillist += email1 + ",";
           console.log(maillist);
         }
       // maillist.substring(0,maillist.length-1);
        maillist +=member[member.length-1].email;
        console.log(maillist);
        var subject= "成员邀请"; // 标题
        var url="localhost:4001/check?ssl="+ssl;
        var html= "<p>请点击<a href='"+url+"'>同意</a>加入团队"+projectname+",此链接24小时后失效</p>" ;// html 内容// 发送邮件
        sendMail(maillist, subject, html, function(err, send_res) {

          if (err) {
            console.log('邀请成员时发送邮件失败:', err);
            req.flash('error', ' 发送邮件失败,请重试!');
            return res.redirect('newproject');
          }
          console.log('邀请成员时发送邮件成功', send_res);
          req.flash('success', '我们已发送好友邀请,请及时查看!');

        });


      
=======
>>>>>>> 6f1789cb43e5a515138bb8a61ace1585745961cc
      });
      for (var i = 0; i < member.length; i++) {
        console.log(member.length);
        var role1 = member[i].role;
        var email1 = member[i].email;
        console.log(email1);
        Project.findByEmail(email1, function (err3, result3) {
          if (err3) {
            console.log('新建项目失败：', err);
            req.flash('error', '新建项目失败!');
            return res.redirect('/newproject');
          }
          if (result3.length == 0) {
            req.flash('error', '该邀请成员不存在！!');
            return res.redirect('/newproject');
          }

<<<<<<< HEAD
     });
=======

          project.inviteMember(email1, function (err4, ssl, result4) {
            if (err4) {
              console.log('新建项目失败：', err);
              req.flash('error', '新建项目失败!');
              return res.redirect('/newproject');
            }
          });
          var data2 = {
            project_id: result2[0].project_id,
            project_name: result2[0].name,
            ss: result2[0].ss,
            member_type: role1,
            user_id: result3[0].id,
            accept: 0
          };
          console.log(data2);
          Project.insertmap(data2, function (err5, rows2) {
            if (err5) {
              console.log('新建项目失败：', err2);
              req.flash('error', '新建项目失败!');
              return res.redirect('/newproject');
            }
          });
        });
      }
    });
    //upload success
    req.flash('success', '新建项目成功!');
    return res.json({
      code: "success"
    });

>>>>>>> 6f1789cb43e5a515138bb8a61ace1585745961cc

  });
  //项目主页面
  app.get('/projectindex', checkLogin.checkLoginUserForm);
  app.get('/projectindex', function (req, res, next) {
    console.log(req.session.user);
    var email = req.session.user.email;
    User.findUserByEmail(email, function (err, rows) {
      if (err) {
        console.log('查找用户信息失败');
        return next(err);
      }
      var user = rows[0];
      var user_id = user.id;

      Project.findByUserId(user_id, function (err, project) {
        if (err) {
          console.log('查找用户项目信息失败123');
          return next(err);
        }
        // console.log(project);
        //console.log(user);
        res.render('project-index', {
          title: '项目主页面',
          user: user,
          project: project,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      });
    });
  });

  
  app.get('/project', checkLogin.checkLoginUserForm);
  app.get('/project', function (req, res) {
    var ssl = req.query.ssl;
    var user_id = req.session.user.id;
    console.log(ssl);
<<<<<<< HEAD
    Project.findBySSL(ssl,function (err,result)
    {
      if(err)
      {
=======
    Project.findByUserIdandssl(user_id, ssl, function (err, result) {
      if (err) {
>>>>>>> 6f1789cb43e5a515138bb8a61ace1585745961cc
        req.flash('error', '查找出错!');
        res.redirect('/projectindex');
      }

<<<<<<< HEAD
      if(result.length>0) {
        Project.findBySSL2(ssl, function (err2, result2) {
          if (err2) {
            req.flash('error', '查找出错!');
            res.redirect('/projectindex');
          }

          console.log(result);
          res.render('project', {
            title: '项目管理',
            user: req.session.user,
            project: result[0],
            projectinf:result2,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
          });
=======
      if (result.length > 0) {
        console.log(result);
        res.render('project', {
          title: '项目管理',
          user: req.session.user,
          project: result[0],
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
>>>>>>> 6f1789cb43e5a515138bb8a61ace1585745961cc
        });
      }
      else {
        console.log(result[0].ss);
        req.flash('error', '该项目不存在或已删除!');
        res.redirect('/projectindex');
      }

    });

  });
  app.get('/check', checkLogin.checkLoginUserForm);
  app.get('/check', function (req, res) {
    var ssl = req.query.ssl;
    var user = req.session.user;
    console.log(ssl);
    Project.findByUserIdandssl(user.id, ssl, function (err, result) {
      if (err) {
        req.flash('error', '查找出错!');
        res.redirect('/projectindex');
      }

      if (result.length > 0) {

<<<<<<< HEAD
       if(result[0].accept==1)
       {
         req.flash('error', '你已加入该团队!');
         res.redirect('/project?ssl='+result[0].ss);
       }
        else {
         Project.updateAccept(result[0],function (err,resu) {
           if(err) {
             req.flash('error', '查找出错!');
             res.redirect('/projectindex');
           }
           req.flash('success', '欢迎您加入了'+result[0].project_name+'项目');
           res.redirect('/project?ssl='+result[0].ssl);
         });
       }
=======
        if (result[0].accept == 1) {
          req.flash('error', '你已加入该团队!');
          res.redirect('/project?ssl=' + project[0].ss);
        }
        else {
          Project.updateAccept(project, function (err, resu) {
            if (err) {
              req.flash('error', '查找出错!');
              res.redirect('/projectindex');
            }
            req.flash('success', '欢迎您加入了' + project[0].project_name + '项目');
            res.redirect('/project?ssl=' + project[0].ssl);
          });
        }
>>>>>>> 6f1789cb43e5a515138bb8a61ace1585745961cc
      }
      else {
        req.flash('error', '该项目不存在或已删除!');
        res.redirect('/home');
      }
    });

  });

  app.get('/topics', checkLogin.checkLoginUserForm);
  app.get('/topics', function (req, res) {
    console.log(1);
    var ssl = req.query.ssl;
    var user_id = req.session.user.id;
    console.log(ssl);
    console.log(user_id);
    Project.findByUserIdandssl(user_id, ssl, function (err, result) {
      if (err) {
        req.flash('error', '查找出错!');
      return   res.redirect('/projectindex');
      }
      if (result.length > 0) {
        console.log(result);
        Topics.findByProjectId(result[0].project_id, function (err, topics) {
          if (err) {
            req.flash('error', '查找出错!');
            res.redirect('/projectindex');
          }
          res.render('topics', {
            title: '讨论',
            topics: topics,
            ssl: ssl,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
          });
        });
      }
      else {
        req.flash('error', '该项目不存在或已删除!');
       return  res.redirect('/projectindex');
      }


    });
  });


  app.get('/document', checkLogin.checkLoginUserForm);
  app.get('/document', function (req, res,next) {
        res.render('document', {
          title: "",
        });
  });


  app.get('/weekly', checkLogin.checkLoginUserForm);
  app.get('/weekly', function (req, res) {
    console.log(1);
    var ssl =req.query.ssl;
    var user_id =req.session.user.id;
    console.log(ssl);
    console.log(user_id);
    Project.findByUserIdandssl(user_id,ssl,function (err,result) {
      if(err) {
        req.flash('error', '查找出错!');
        res.redirect('/projectindex');
      }
      if(result.length>0) {
        console.log(result);
        Weekly.findByProjectId(result[0].project_id, function (err, weekly) {
          if (err) {
            req.flash('error', '查找出错!');
            return    res.redirect('/projectindex');
          }
          res.render('upload', {
            title: '周报',
            weeklys: weekly,
            ssl:ssl,
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
          });
        });
      }
      else
      {
        req.flash('error', '该项目不存在或已删除!');
       return res.redirect('/projectindex');
      }


    });
  });
  app.post('/publish', checkLogin.checkLoginUserForm);
  app.post('/publish', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var ssl = req.body.ss;
    var user = req.session.user;
    Project.findByUserIdandssl(user.id, ssl, function (err, result) {
      if (err) {
        req.flash('error', '查找出错!');
        res.redirect('/projectindex');
      }
      if (result.length > 0) {
        console.log(result);
        var topics = new Topics(title, content);
        topics.publish(result[0].user_id, result[0].project_id, function (err, presult) {
          if (err) {
            console.log(err);
            req.flash('error', '插入出错!');
            return res.json({
              code: "error"
            });
          }
          else {
            req.flash('success', '发布讨论成功');
            return res.json({
              code: "success"
            });
          }

        });
      }
      else {
        req.flash('error', '该项目不存在或已删除!');
        res.redirect('/projectindex');
      }


    });
  });
};


module.exports = routes;
