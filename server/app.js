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
var kitchenRoutes = require('./routes/kitchenRoutes');
var productRoutes = require('./routes/productRoutes');
var incomeConfigRoutes = require('./routes/incomeConfigRoutes');
var tableRoutes = require('./routes/tableRoutes');
var restaurentRoutes = require('./routes/restaurentRoutes');
var orderedProductRoutes = require('./routes/orderedProductRoutes');
var productCategoryRoutes = require('./routes/productCategoryRoutes');
var orderRoutes = require('./routes/orderRoutes');
var employeeRoutes = require('./routes/employeeRoutes');

var loginRoutes = require('./routes/loginRoutes');

const { authenticateJWT } = require('./middlewares/authenticateJWT');


var app = express();

var db = require("./models");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up the CORS options
const corsOptions = {
  origin: 'http://localhost:5173',
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


app.use('/login', loginRoutes);

app.use('/api', employeeRoutes);
//here the order is important [routes area]
app.use('/', indexRouter);
app.use('/api', authenticateJWT, clientRouter);
app.use('/api', authenticateJWT,kitchenRoutes);
app.use('/api', authenticateJWT,productRoutes);
app.use('/api', authenticateJWT,incomeConfigRoutes);
app.use('/api', authenticateJWT,tableRoutes);
app.use('/api', authenticateJWT,restaurentRoutes);
app.use('/api', authenticateJWT,orderedProductRoutes);
app.use('/api', authenticateJWT,productCategoryRoutes);
app.use('/api', authenticateJWT,orderRoutes);



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
