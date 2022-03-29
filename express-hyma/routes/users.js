var express = require('express');
var router = express.Router();
var users = require('../users').items;
const { login } = require('../controller/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    errno: 0,
    data: '访问到 /users 路由'
  })
});

router.get('/test-login', function(req, res, next) {
  const session = req.session;
  const ifLogined = !!session.username;
  console.log('test-login session.username', session.username)
  if (ifLogined) {
    res.json({
      errno: 0,
      data: '当前是登陆状态'
    })
  } else {
    res.json({
      errno: -1,
      data: '当前未登陆状态'
    })
  }
})

router.post('/login', function(req, res, next) {
  // 注意: 登陆后检查 postman 的 cookies
  var session = req.session;
  var result = login(req, res);
  console.log('---login data', req.body.username, req.body.password, req.session)
  return result.then(data => {
    if (data.username) {
      req.session.username = data.username;
      req.session.realname = data.realname;
      res.json({ret_code: 0, ret_msg: `登陆成功${req.session.username}${req.session.realname}`}); 
    } else {
      res.json({ret_code: 1, ret_msg: '账号或密码错误'}); 
    }
  })
});

router.post('/logout', function(req, res, next) {
  // 注意: 登出后检查 postman 的 cookies
  req.session.destroy(function(err) {
    if(err){
        res.json({ret_code: 2, ret_msg: '退出登录失败'});
        return;
    }
    // 这里的 ‘session_key’ 是app.js里定义的 identityKey
    res.clearCookie('session_key'); // 清除cookie
    res.redirect('/');
  });
});


module.exports = router;
