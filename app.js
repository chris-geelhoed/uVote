var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var history = require('connect-history-api-fallback');

var poll = require('./routes/poll');
var vote = require('./routes/vote');

var app = express();
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var dbUrl = `mongodb://${config.username}:${config.password}@${config.url}:${config.port}/${config.db}`;

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl, {
  useMongoClient: true
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(history());
app.use(express.static('./public/dist'));
app.use('/api/poll', poll);
app.use('/api/vote', vote);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
