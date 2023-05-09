var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
let systemUtilsRouter = require('./routes/system-utils');
let indexRouter = require('./routes/index');



const crypto = require('crypto');
var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/system-utils', systemUtilsRouter);
app.use('/index', indexRouter);
app.use(express.static('public'));
const fs = require('fs');
// Endpoint to download the example file
const privateKeyPath = path.join(__dirname, 'private-key.pem');
const certificatePath = path.join(__dirname, 'digital-certificate.txt');

// Serve the certificate file
app.get('/certificate.txt', (req, res) => {
  fs.readFile(certificatePath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error reading certificate file');
    } else {
      res.set('Content-Type', 'text/plain');
      res.send(data);
    }
  });
});

// Handle signing request
app.get('/signing', (req, res) => {
  const toSign = req.query.request;

  fs.readFile(privateKeyPath, 'utf-8', (err, privateKey) => {
    if (err) {
      res.status(500).send('Error reading private key file');
    } else {
      const sign = crypto.createSign('SHA512');
      sign.update(toSign);
      const signature = sign.sign({key : privateKey}, 'base64');
      res.set('Content-Type', 'text/plain');
      res.send(signature);
    }
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(console.log(404));
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
