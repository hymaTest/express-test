var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    errno: 0,
    data: '访问到 /users 路由'
  })
});

module.exports = router;
