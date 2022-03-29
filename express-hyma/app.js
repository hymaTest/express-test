var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); // 初始化app
var identityKey = 'session_key'; // 用于session

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(logger('dev', {
  // stream：日志的输出流配置，默认是process.stdout。
  stream: accessLogStream
})); // 写入access.log文件 

app.use(express.json()); // 处理post请求中的 req.body
app.use(express.urlencoded({ extended: false })); // 处理post请求中的 req.body
app.use(cookieParser()); // 处理cookie为 {key: value} 格式
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: identityKey,
  secret: 'chyingp', // 用来对session id相关的cookie签名
  store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 24 * 60 * 60 * 1000  // 有效期，单位是毫秒
  }
}))

app.use('/', indexRouter); // 注册路由
app.use('/users', usersRouter); // 注册路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
