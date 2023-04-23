require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require ('cors'); 

// routes
var indexRouter = require('./routes/index');
var clientRouter = require('./routes/clientRoutes');
var productRoutes = require('./routes/productRoutes');
var CoffeeShopConfigRoutes = require('./routes/CoffeeShopConfigRoutes');
var tableRoutes = require('./routes/tableRoutes');
var coffeeShopRoutes = require('./routes/coffeeShopRoutes');
var orderedProductRoutes = require('./routes/orderedProductRoutes');
var productCategoryRoutes = require('./routes/productCategoryRoutes');
var orderRoutes = require('./routes/orderRoutes');
var employeeRoutes = require('./routes/employeeRoutes');

var loginRoutes = require('./routes/loginRoutes');

const { authenticateJWT } = require('./middlewares/authenticateJWT');


var app = express();

const db = require("./models");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up the CORS options
const corsOptions = {
  origin: process.env.REACT_APP_URL,
  optionsSuccessStatus: 200,
  credentials: true
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//here the order is important [routes area]
app.use('/', indexRouter);

const apiRoutes = require('/routes');

app.use('/api/*', authenticateJWT);
app.use('/api', apiRoutes);
app.use('/login', loginRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
