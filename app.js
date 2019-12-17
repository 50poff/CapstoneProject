var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var dotenv = require('dotenv');

dotenv.config();


var app = express();

// connection via mariasql 
const db = require('./api_server/db');

app.use(passport.initialize());
//Router
const appRouter = require('./app_server/routes/app_router');
const apiRouter = require('./api_server/routes/api_router'); 
// view engine setup

//2. Configuration - Use Pug as our HTML Template Engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// For images (may not work yet)
app.use(express.static(__dirname + "/public"));

//app.use('/', appRouter);
app.use('/api/v1', apiRouter); 
app.use('/',appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;
