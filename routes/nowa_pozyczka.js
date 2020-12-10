var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DebtApp' });
});

//Route dla sciezki zdarzenia
router.get('/zdarzenia', function(req, res, next) {
  res.render('zdarzenia', { title: 'Zdarzenia' });
});

//Route dla sciezki prywatne
router.get('/prywatne', function(req, res, next) {
  res.render('prywatne', { title: 'Prywatne' });
});

//Route dla sciezki wydatki
router.get('/wydatki', function(req, res, next) {
  res.render('wydatki', { title: 'Wydatki' });
});

router.get('/nowa_pozyczka', function(req, res, next) {
  res.render('nowa_pozyczka', { title: 'Nowa Pożyczka' });
});

module.exports = router;
