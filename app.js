var createError = require('http-errors');
var express = require('express');
//var favicon = require('serve-favicon');
var path = require('path');
let date = require('date-and-time');


//var favison=require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser');
const nodemailer = require('nodemailer');
//reference we added
const mongoose= require('mongoose');
const config =require('./config/globals');

//auth packages
const passport =require('passport');
const session= require('express-session');
const localStrategy=require('passport-local').Strategy;
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;


var index = require('./controllers/index');
//var usersRouter = require('./controllers/users');
const cars=require('./controllers/cars');
const makes=require('./controllers/makes');
const blogs=require('./controllers/blogs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( express.static( "public" ) );
//app.use(favicon(path.join('Client','src',favicon.ico)));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//db connection
mongoose.connect(config.db);




//passport configuration

app.use(session({
    secret: 'any string for salting here',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//reference User model
const User =require('./models/user');
passport.use(User.createStrategy());


//session management for users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// google auth stratehy
// google auth strategy
passport.use(new googleStrategy({
        clientID: config.google.googleClientId,
        clientSecret: config.google.googleClientSecret,
        callbackURL: config.google.googleCallbackUrl,
        profileFields: ['id', 'emails']
    },
    (accessToken, refreshToken, profile, callback) => {
        User.findOrCreate({
            googleId: profile.id,
            username: profile.emails[0].value
        }, (err, user) => {
            return callback(err, user);
        });
    }
));

//map controller paths
app.use('/', index);
//app.use('/users', usersRouter);
//map all request with /cars
app.use('/cars',cars);
app.use('/makes',makes);
app.use('/blogs',blogs);
/**contact***************/


/**********end of contact*********/
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
