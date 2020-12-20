var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/index', async function(req, res, next) {

  const id = req.query.id;
  const loans = await req.db.db('debtapp')
             .collection('loans')
             .find({})            
             .collation({
               locale: 'pl'
             })
             .sort(['name', 1]).toArray();

  const events = await req.db.db('debtapp')
             .collection('events')
             .find({})            
             .collation({
               locale: 'pl'
             })
             .sort(['name', 1]).toArray();

  const expenses = await req.db.db('debtapp')
             .collection('expenses')
             .find({})            
             .collation({
               locale: 'pl'
             })
             .sort(['name', 1]).toArray();
  
  res.render('index', { title: 'DebtApp', loans: loans, events: events, expenses:expenses });
});

router.get('/newEvent', function(req, res, next) {
  res.render('newEvent', { title: 'Nowe Zdarzenie' });
});

router.get('/newLoan', function(req, res, next) {
  res.render('newLoan', { title: 'Nowa Pożyczka' });
});

router.get('/newExpense', function(req, res, next) {
  res.render('newExpense', { title: 'Nowy wydatek' });
});

module.exports = router;
