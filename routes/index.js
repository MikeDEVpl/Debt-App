var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;


//Get all for index page
router.get('/index/', async function(req, res, next) {

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
  
  res.render('index', 
    { title: 'DebtApp', 
    loans: loans, 
    events: events, 
    expenses: expenses });
});

/* GET loan */
router.get('/newLoan/', async function(req, res, next) {
  const id = req.query.id;
  let newLoan;
  if (id) {
      newLoan = await req.db.db('debtapp')
          .collection('loans')
          .findOne(ObjectId(id));
  } else {
    newLoan = {
      name: "",
      amount: "",
      returnDate:"",
      paid: false
    };
  }
  res.render('newLoan', { title: 'New/Edit loan', newLoan: newLoan });
});


/* POST loan */
router.post('/newLoan/', async function (req, res, next) {
  try {
    let newLoan = {
      _id: req.body._id ? ObjectId(req.body._id) : undefined,
      name: req.body.name,
      amount: req.body.amount,
      returnDate: req.body.returnDate,
      paid: false
    };

    if (newLoan._id) {
      await req.db.db('debtapp').collection("loans").replaceOne({_id: newLoan._id}, newLoan);
    } else {
      await req.db.db('debtapp').collection("loans").insertOne(newLoan);
    }
    res.redirect('/index/');
  } catch (err) {
    console.error(err);
  }
  //next();
});

// Delete loan
router.get('/loan-delete/', async function (req, res, next) {
  try {
      let id = req.query.id;
      await req.db.db('debtapp').collection("loans").findOneAndDelete({_id: ObjectId(id)});
      res.redirect('/index/');
  } catch (err) {
      console.error(err);
  }
  //next();
});

router.get('/newEvent/', function(req, res, next) {
  res.render('newEvent', { title: 'Nowe Zdarzenie' });
});

router.get('/newLoan/', function(req, res, next) {
  res.render('newLoan', { title: 'Nowa Pożyczka' });
});

router.get('/newExpense/', function(req, res, next) {
  res.render('newExpense', { title: 'Nowy wydatek' });
});



module.exports = router;
