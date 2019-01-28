var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* app's routes */
app.use('/', require('./routes/index'));
app.use('/apiv1/', require('./routes/adds'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
function isAPIRequest(req){
  return req.originalUrl.indexOf('/apiv1/') === 0;
}
app.use(function(err, req, res, next) {
  if(err.array){ 
    err.status = 422;
    const errInfo = err.array({onlyFirstError:true})[0];
    console.log(errInfo);
    err.message = isAPIRequest(req) ? {message: 'not valid',errors: err.mapped()} : `Not valid - ${errInfo.param} ${errInfo.msg}`;
  } 
  // render the error page
  res.status(err.status || 500);
  if(isAPIRequest(req)){
    res.json({success: false, error:err.message});
    return;
  }
   // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});
module.exports = app;
