var Weekly = require('../models/weekly.model');

var routes = function (app) {



  app.get('/admin', function (req, res) {
    res.render('admin_index', {
      title: '管理员后台'
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
};

module.exports = routes;
