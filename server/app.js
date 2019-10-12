var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
// const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const loginPassport = require('./routes/middleware/passport');
var mainRouter = require('./routes/main');
// const viewRouter = require('./routes/view');
var morgan = require('morgan');
require('dotenv').config();
const app = express();


const Cafes = require('./models/Cafes');
const Category = require('./models/Category');



const port = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongodb server');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.YOUR_SECRET_KEY,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
    resave: false,
    saveUninitialized: true
  })
);

// app.use(passport.initialize());
// app.use(passport.session());


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


app.use(morgan('dev'));

loginPassport(passport);

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', mainRouter);
// app.use('/api/view', viewRouter);

app.post('/newCafemenu', async function (req, res, next) {
  const test = await Cafes.findOne({});
  // console.log(test);
  // test.forEach
  console.log(req.body.menu);
  test.menu.push(req.body.menu[0]);
  console.log(test);

  await test.save();
  // test.save();
  // const newCategory = new Cafes(req.body);
  // console.log(newCategory);
  // newCategory.save();
  res.send({})
})

//카페추가
// app.post('/newCafemenu', async function (req, res, next) {
//   const newCategory = new Cafes(req.body);
//   newCategory.save();
//   res.send({})
// })




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});

module.exports = app;
