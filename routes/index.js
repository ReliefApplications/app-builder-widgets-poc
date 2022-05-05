var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'App Builder Widgets' });
  // res.render('application', { title: 'Application Widget' });
});

module.exports = router;
