require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require ('cors'); 
var http = require('http')
const {Server} = require('socket.io')
const multer = require('multer');
// routes
const serveStatic = require('serve-static');
var indexRouter = require('./routes/index');



const { authenticateJWT } = require('./middleware/authenticateJWT');


var app = express();

const db = require("./models");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const serveOptions = {
  maxAge: '30d', // The browser will cache images for 30 days
  immutable: true,
};

app.use('/uploads', serveStatic('uploads', serveOptions));
// Set up the CORS options
const corsOptions = {
//  origin: process.env.REACT_APP_URL,
//  optionsSuccessStatus: 200,
//  credentials: true
};

// Use the CORS middleware with the specified options
app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//here the order is important [routes area]
app.use('/', indexRouter);

const apiRoutes = require('./routes');
const protectedEmployeesRouter = require('./protected-routes/pos-employees')
const protectedCheckRouter = require('./protected-routes/check-authentication')
const loginHandler = require('./middleware/loginHandler')
const clientLoginRoute = require('./protected-routes/client-login')
const licenseKeyVerificationRouter = require('./protected-routes/license-key-verification');

app.use('/license-key-verfication', licenseKeyVerificationRouter)

app.use('/protected', protectedEmployeesRouter)
app.use('/protected', protectedCheckRouter)
app.use('/client-login',clientLoginRoute )

//app.get('/usernames', licenseHandler);
app.post('/pos-login', loginHandler);


app.use('/api/*', authenticateJWT);
app.use('/api', apiRoutes);

app.post('/api/validate-token', (req, res) => {
  const { token, coffeeShopId } = req.body;

  // Replace with your logic to validate the token and coffee shop ID
  const isValidToken = true;

  if (isValidToken) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});


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

const server = http.createServer(app);
const io = new Server(server)


module.exports = app;

