const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const logger = require('morgan');

const middleware = {}

const routes = {
   lobby: require('./routes/lobby')
}

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());

app.use(session({
   store: new FileStore({}),
   secret: process.env.SESSION_SECRET, 
   resave: false, 
   saveUninitialized: true,
   maxAge: (60 * 60 * 24 * 1000)
}));

app.use(express.static(path.join(__dirname, 'public')));

/* App Routes */
app.use('/', routes.lobby);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;