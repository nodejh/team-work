var express = require('express');
var router = express.Router();

/* post register page. */
router.post('/register', function(req, res, next) {

  // 获取用户名和密码，并存入数据库
  var name = req.body.name;
  var passwd = req.body.passwd;

  req.getConnection(function(err, connection) {

    if (err) {
      return res.json({
        code: 5000,
        msg: 'connection error'
      });
    }


    var insert = 'INSERT INTO user SET ?';
    var parameter = {
      name: name,
      passwd: passwd
    };

    connection.query(insert, parameter, function (err, rows) {
      if (err) {
        return res.json({
          code: 5001,
          msg: 'insert error'
        });
      }


      return res.json({
        code: 0,
        msg: 'success'
      });

    });
  });
});

module.exports = router;
