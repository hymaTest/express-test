var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    errno: 0,
    data: '访问到 / 路由'
  })
  // res.render('index', { title: 'Express' });
});

module.exports = router;
