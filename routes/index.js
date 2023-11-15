var express = require('express');
var router = express.Router();

// Main page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'App Builder Widgets' });
});

// Load application
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.render('index', { title: 'App Builder Widgets', id });
});


// Load application
router.get('/:id/*', function(req, res, next) {
  const id = req.params.id;
  res.render('index', { title: 'App Builder Widgets', id });
  // const path = req.params[0];
  // res.render('index', { title: 'App Builder Widgets', id, path });
});

module.exports = router;
