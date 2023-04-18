var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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




var app = express();

var db = require("./models");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//here the order is important [routes area]
app.use('/', indexRouter);
app.use('/api', clientRouter);
app.use('/api', kitchenRoutes);
app.use('/api', productRoutes);
app.use('/api', incomeConfigRoutes);
app.use('/api', tableRoutes);
app.use('/api', restaurentRoutes);
app.use('/api', orderedProductRoutes);
app.use('/api', productCategoryRoutes);
app.use('/api', orderRoutes);


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
