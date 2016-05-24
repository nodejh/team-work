var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var index = require('./routes/index');
var admin = require('./routes/admin');
var config = require('./config/config');

var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});

var app = express();


app.set('port', process.env.PORT || config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(morgan('dev'));
app.use(morgan('combined', {stream: accessLog}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.cookie.cookieSecret,
  key: config.mongodb.db,
  cookie: {maxAge: config.cookie.maxAge},
  // store: new MongoStore({
  //   url: config.mongodb.url
  // }),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// 用户相关
index(app);
// 管理员相关
admin(app);

app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + ']' + req.url + '\n';
  console.log(meta + err.stack + '\n');
  errorLog.write(meta + err.stack + '\n');
  next();
});

app.listen(app.get('port'), function () {
  console.log('Server is listening on port ' + app.get('port'));
});
