var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DebtApp' });
});

//Route dla sciezki events
router.get('/events', function(req, res, next) {
  res.render('events', { title: 'events' });
});

//Route dla sciezki loans
router.get('/loans', function(req, res, next) {
  res.render('loans', { title: 'loans' });
});

//Route dla sciezki expenses
router.get('/expenses', function(req, res, next) {
  res.render('expenses', { title: 'expenses' });
});

router.get('/newEvent', function(req, res, next) {
  res.render('newEvent', { title: 'Nowe Zdarzenie' });
});

module.exports = router;
