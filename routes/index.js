var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

//Get LOANS page
router.get('/loans/', async function(req, res, next) {
  const pageSize = 3;
  let sort = parseInt(req.query.sort);
  sort = sort ? sort : 1;
  let search = req.query.search;
  let querySearch = search ?
  {
    name:
      {$regex: search, $options: 'i'}
  }
  : {};

  const count = await req.db.db('debtapp')
    .collection('loans')
    .countDocuments(querySearch);

  const maxPage = Math.floor(count / pageSize);
  let page = parseInt(req.query.page);
  page = page >= 0 ? page : 0;
  page = page <= maxPage ? page : maxPage;
  const prevPage = page > 0 ? page - 1 : 0;
  const nextPage = page < maxPage ? page + 1 : maxPage;

  const loans = await req.db.db('debtapp')
             .collection('loans')
             .find(querySearch)            
             .collation({
               locale: 'pl'
             })
             .sort(['name', sort])
             .skip(page * pageSize)
             .limit(pageSize)
             .toArray();
   
  res.render('loans', 
    { title: 'DebtApp', 
    loans: loans, 
    sort: sort,
    page: page,
    prevPage: prevPage,
    nextPage: nextPage,
    maxPage: maxPage,
    count: count });
});

//GET EVENTS page
router.get('/events/', async function(req, res, next) {
  const pageSize = 3;
  let sort = parseInt(req.query.sort);
  sort = sort ? sort : 1;
  let search = req.query.search;
  let querySearch = search ?
  {
    name:
      {$regex: search, $options: 'i'}
  }
  : {};

  const count = await req.db.db('debtapp')
    .collection('events')
    .countDocuments(querySearch);

  const maxPage = Math.floor(count / pageSize);
  let page = parseInt(req.query.page);
  page = page >= 0 ? page : 0;
  page = page <= maxPage ? page : maxPage;
  const prevPage = page > 0 ? page - 1 : 0;
  const nextPage = page < maxPage ? page + 1 : maxPage;

  const events = await req.db.db('debtapp')
             .collection('events')
             .find(querySearch)            
             .collation({
               locale: 'pl'
             })
             .sort(['name', sort])
             .skip(page * pageSize)
             .limit(pageSize)
             .toArray();
   
  res.render('events', 
    { title: 'DebtApp', 
    events: events, 
    sort: sort,
    page: page,
    prevPage: prevPage,
    nextPage: nextPage,
    maxPage: maxPage,
    count: count });
});

//Get Expenses page
router.get('/expenses/', async function(req, res, next) {
  const pageSize = 3;
  let sort = req.query.sort;
  sort = sort ? sort : 1;
  let search = req.query.search;
  let querySearch = search ?
  {
    event:
      {$regex: search, $options: 'i'}
  }
  : {};

  const count = await req.db.db('debtapp')
    .collection('expenses')
    .countDocuments(querySearch);

  const maxPage = Math.floor(count / pageSize);
  let page = parseInt(req.query.page);
  page = page >= 0 ? page : 0;
  page = page <= maxPage ? page : maxPage;
  const prevPage = page > 0 ? page - 1 : 0;
  const nextPage = page < maxPage ? page + 1 : maxPage;

  const expenses = await req.db.db('debtapp')
             .collection('expenses')
             .find(querySearch)            
             .collation({
               locale: 'pl'
             })
             .sort(['name', sort])
             .skip(page * pageSize)
             .limit(pageSize)
             .toArray();
   
  res.render('expenses', 
    { title: 'DebtApp', 
    expenses: expenses, 
    sort: sort,
    page: page,
    prevPage: prevPage,
    nextPage: nextPage,
    maxPage: maxPage,
    count: count });
});

// //GET expenses and participants for newEvent page
// router.get('/newExpense/', async function(req, res, next) {
//   const events = await req.db.db('debtapp')
//     .collection('events')
//     .find({})
//     .collation({
//     locale: 'pl'
//   })
//   .toArray();

  
//   res.render('newExpense', { title: 'New Expense', events: events });  
//   });
  
/* GET single loan */
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

/* GET single event */
router.get('/newEvent/', async function(req, res, next) {
  const id = req.query.id;
  let newEvent;
  if (id) {
      newEvent = await req.db.db('debtapp')
          .collection('events')
          .findOne(ObjectId(id));
  } else {
    newEvent = {
      name: "",
      date:"",
      participants: []
    };
  }
  res.render('newEvent', { title: 'New/Edit event', newEvent: newEvent });
});

/* GET single expense */
router.get('/newExpense/', async function(req, res, next) {
  const id = req.query.id;
  let newExpense;
  if (id) {
      newExpense = await req.db.db('debtapp')
          .collection('expenses')
          .findOne(ObjectId(id));
  } else {
    newExpense = {
      event:"",
      name: "",
      cost:"",
      sponsoredBy:""
    };
  }
  res.render('newExpense', { title: 'New/Edit event', newExpense: newExpense });
});

/* POST single loan */
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
    res.redirect('/loans/');
  } catch (err) {
    console.error(err);
  }
  //next();
});

/* POST single event */
router.post('/newEvent/', async function (req, res, next) {
  try {
    // parse participants
    let participantArray = req.body.participants.split(',');

    let newEvent = {
      _id: req.body._id ? ObjectId(req.body._id) : undefined,
      name: req.body.name,
      date: req.body.date,
      participants: participantArray
    };

    if (newEvent._id) {
      await req.db.db('debtapp').collection("events").replaceOne({_id: newEvent._id}, newEvent);
    } else {
      await req.db.db('debtapp').collection("events").insertOne(newEvent);
    }
    res.redirect('/events/');
  } catch (err) {
    console.error(err);
  }
  //next();
});


//POST single expense
router.post('/newExpense/', async function (req, res, next) {
  try {  

    let newExpense = {
      _id: req.body._id ? ObjectId(req.body._id) : undefined,
      event: req.body.event,
      name: req.body.name,
      cost: req.body.cost,
      sponsoredBy: req.body.sponsoredBy
    };

    if (newExpense._id) {
      await req.db.db('debtapp').collection("expenses").replaceOne({ _id: newExpense._id }, newExpense);
    } else {
      await req.db.db('debtapp').collection("expenses").insertOne(newExpense);
    }
    res.redirect('/expenses/');

  } catch (err) {
    console.error(err);
  }
});


// Delete loan
router.get('/loan-delete/', async function (req, res, next) {
  try {
      let id = req.query.id;
      await req.db.db('debtapp').collection("loans").findOneAndDelete({_id: ObjectId(id)});
      res.redirect('/loans/');
  } catch (err) {
      console.error(err);
  }
  //next();
});

// Delete Event
router.get('/event-delete/', async function (req, res, next) {
  try {
      let id = req.query.id;
      await req.db.db('debtapp').collection("events").findOneAndDelete({_id: ObjectId(id)});
      res.redirect('/events/');
  } catch (err) {
      console.error(err);
  }
  //next();
});

// Delete Expense
router.get('/expense-delete/', async function (req, res, next) {
  try {
      let id = req.query.id;
      await req.db.db('debtapp').collection("expenses").findOneAndDelete({_id: ObjectId(id)});
      res.redirect('/expenses/');
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

//router.get('/newExpense/', function(req, res, next) {
//  res.render('newExpense', { title: 'Nowy wydatek' });
//});

router.get('/events/', function(req, res, next) {
  res.render('events', { title: 'Events' });
});

router.get('/loans/', function(req, res, next) {
  res.render('loans', { title: 'Loans' });
});

router.get('/expenses/', function(req, res, next) {
  res.render('expenses', { title: 'Expenses' });
});

router.get('/index/', async function(req, res, next) {
  res.render('index', { title: 'DebtApp'});
});

module.exports = router;
