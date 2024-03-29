var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


// For authorize
var bodyParser = require('body-parser');

//var indexRouter = require('./routes/index');
//var accountRouter = require('./routes/account');
var categoryRouter =require('./routes/category');
var itemRouter = require('./routes/item');
var imageRouter = require('./routes/image');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '4mb'}));
app.use(express.urlencoded({ extended: true, limit: '4mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// for authorize
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit:'4mb' }));

// app.use('/', indexRouter);
//app.use('/account', accountRouter);
app.use('/category',  categoryRouter);
app.use('/item', itemRouter);
app.use('/image', imageRouter);

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

// CORS middleware for authorize
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

module.exports = app;