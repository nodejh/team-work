var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/Register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});
router.get('/Home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = router;