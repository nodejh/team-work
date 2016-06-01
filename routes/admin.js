var Weekly = require('../models/weekly.model');

var routes = function (app) {



  app.get('/admin', function (req, res) {
    res.render('admin_index', {
      title: '管理员后台'
    });
  });


  // 查看本周周报
  app.get('/admin/weekly', function (req, res) {
    var week = 13;
    Weekly.findWeeklyByWeek(week, function (err, rows) {
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



  // 按周查看本周周报
  app.get('/admin/weekly/:week', function (req, res) {
    var week = req.params.week;
    Weekly.findWeeklyByWeek(week, function (err, rows) {
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



  // 查看所有周报
  app.get('/admin/weekly_all', function (req, res) {
    Weekly.findAll(function (err, rows) {
      if (err) {
        console.log('error 查看所有周报', err);
        return next(err);
      }
      res.render('admin_weekly_all', {
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
