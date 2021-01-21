var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;
var {check,validationResult} = require('express-validator');


// LOANS ---------------------------------------------------------------
//Get LOANS page
router.get('/loans/', async function(req, res, next) {
  const pageSize = 6;
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
  
    loans.forEach(element => {
    element.paid = element.paid == "true" ? element.paid = "Paid" : "Not paid";
  });
  
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
  let errors;

 res.render('newLoan', { title: 'New/Edit loan', newLoan: newLoan, errors : errors });
});

/* POST single loan */
router.post('/newLoan/', 
//Field validations
check('amount').isNumeric().withMessage("enter numeric amount"), 
check('name').notEmpty().withMessage('enter name'),
check('returnDate').notEmpty().withMessage('enter date').isDate().withMessage('enter correct date'),
async function (req, res, next) {

  let newLoan = {
    _id: req.body._id ? ObjectId(req.body._id) : undefined,
    name: req.body.name,
    amount: req.body.amount,
    returnDate: req.body.returnDate,
    paid: req.body.paid
  };

  let e = validateFormServerSide(req);
  if(e.flag){
    res.render('newLoan', { title: 'New/Edit loan', newLoan: newLoan, errors : e.errMsgs });
  }
  else
  {
    try {
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


//EVENTS ----------------------------------------------------------------
//GET EVENTS page
router.get('/events/', async function(req, res, next) {
  const pageSize = 6;
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

  let errors;
  res.render('newEvent', { title: 'New/Edit event', newEvent: newEvent, errors: errors });
});

/* POST single event */
router.post('/newEvent/', 
//Field validations
check('name').notEmpty().withMessage('Enter event name'),
check('date').isDate().withMessage('Enter correct date'),
check('participants').notEmpty().withMessage('Enter participants'),
async function (req, res, next) {
  
    // parse participants
    let participantArray = req.body.participants.split(',');

    let newEvent = {
      _id: req.body._id ? ObjectId(req.body._id) : undefined,
      name: req.body.name,
      date: req.body.date,
      participants: participantArray
    };

    let e = validateFormServerSide(req);
    if (e.flag) {
      res.render('newEvent', { title: 'New/Edit event', newEvent: newEvent, errors: e.errMsgs });
    }
    else {
      try {
      if (newEvent._id) {
        await req.db.db('debtapp').collection("events").replaceOne({ _id: newEvent._id }, newEvent);
      } else {
        await req.db.db('debtapp').collection("events").insertOne(newEvent);
      }
      res.redirect('/events/');
    } catch (err) {
      console.error(err);
    }
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

//EXPENSES --------------------------------------------------------------
//Get Expenses page
router.get('/expenses/', async function(req, res, next) {
  const pageSize = 6;
  let sort = parseInt(req.query.sort);
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

/* GET single expense */
router.get('/newExpense/', async function(req, res, next) {
  const id = req.query.id;
  let newExpense;
  let events;
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

  events = await req.db.db('debtapp')
  .collection('events')
  .find()            
  .collation({
    locale: 'pl'
  })
  .sort()
  .toArray();
  
  let errors;

  res.render('newExpense', { title: 'New/Edit event', 
    newExpense: newExpense, 
    events: events,
    errors: errors });
});

//POST single expense
router.post('/newExpense/', 
//Field validations
check('event').notEmpty().withMessage("Select event"),
check('name').notEmpty().withMessage("Enter expense name"),
check('cost').isNumeric().withMessage('enter numeric cost'),
check('sponsoredBy').notEmpty().withMessage("Select sponsor"),
async function (req, res, next) {

  let newExpense = {
    _id: req.body._id ? ObjectId(req.body._id) : undefined,
    event: req.body.event,
    name: req.body.name,
    cost: req.body.cost,
    sponsoredBy: req.body.sponsoredBy
  };

  let events = await req.db.db('debtapp')
  .collection('events')
  .find()            
  .collation({
    locale: 'pl'
  })
  .sort()
  .toArray();

  let e = validateFormServerSide(req);
  if (e.flag) {
    res.render('newExpense', { title: 'New/Edit event', 
    newExpense: newExpense, 
    events: events,
    errors: e.errMsgs });
  }
  else {
    try {
      if (newExpense._id) {
        await req.db.db('debtapp').collection("expenses").replaceOne({ _id: newExpense._id }, newExpense);
      } else {
        await req.db.db('debtapp').collection("expenses").insertOne(newExpense);
      }
      res.redirect('/expenses/');

    } catch (err) {
      console.error(err);
    }
  }
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

//REPORTS ---------------------------------------------------------------
//GET reports
router.get('/reports/', async function(req, res, next) {

  //Report 1 - not paid loans
  const loans = await req.db.db('debtapp')
             .collection('loans')
             .find({paid: "false"})
             .toArray();
  
    loans.forEach(element => {
    element.paid = element.paid == "true" ? "Paid" : "Not paid";
  });
  
  let report1 = {
    name: "Loans Report", 
    desc: "Not paid loans", 
    loans: loans
  };

//Zle dziala - bo nie gropuje eventów dla partycypanta

  //Report 2 - which user is participating in event
  const events = await req.db.db('debtapp')
  .collection('events')
  .find({})
  .toArray();

  var participantsForEvents = [];

  events.forEach(event => {
    event.participants.forEach(participant => {
      participantsForEvents.push({participant : participant, event: event.name});
    });
  });


  let report2 ={
    name: "Event users",
    desc: "Events by user",
    events: participantsForEvents
  };

  //Raport 3 - Sum of expenses for event
  const expenses = await req.db.db('debtapp')
  .collection('expenses')
  .find({})
  .toArray();

  let total ={};
  let report3 ={
    name: "Event total cost",
    desc: "Cost of all expenses for event",
    total: total
  };

  // let report4 ="d";

  res.render('reports', { title: 'Reports',report1: report1, report2: report2, report3: report3 });  
});
  
//ROOT ------------------------------------------------------------------
router.get('/index/', async function(req, res, next) {
  res.render('index', { title: 'DebtApp'});
});

router.get('/', async function(req, res, next) {
  res.render('index', { title: 'DebtApp'});
});

module.exports = router;

//HELPERS ----------------------------------------------------------------

function validateFormServerSide(req){
  let errMsgs = _validateForm(req);
  let flag;
  if(errMsgs == undefined || errMsgs.length !=0){
    flag = true;
  }

  return {flag: flag, errMsgs : errMsgs};
}

function _validateForm(req){
  let errors = validationResult(req);
  let errMsgs = [];
  if(!errors.isEmpty()){
    errMsgs = _parseErrors(errors);
  }
  return errMsgs;
};


function _parseErrors(errors) {
  let errMsgs =[];
  for (var err of errors.array()) {
    for (var key in err) {
      if (key == 'msg') {
        errMsgs.push(err[key]);
      }
    }
  }

  return errMsgs;
};

