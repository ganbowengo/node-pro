/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-06-24 15:25:57
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-17 17:59:32
 */
var path = require('path');
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var messages = require('./middleware/messages');

var indexRouter = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(messages);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
