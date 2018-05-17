const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./config/database.js');
const User = require('./models/user');
const userRouter = require('./route/user.route');
const productsRouter = require('./route/products.route');
const ordersRouter = require('./route/order.route');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();

// Logging
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});
app.use(morgan('combined', {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
}));

// Security
app.use(helmet());

// Product pictures folder
app.use('/uploads', express.static('uploads'));

// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Session handling
app.use(session({
  secret: 'secret',
  resave: true,
  httpOnly: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // seconds which equals 1 week
  },
}));

// Passport - Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(db.uri, db.options)
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch((err) => {
    console.error(`MongoDB error.:${err}`);
  });

// CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'lazyUpdate, normalizedNames, headers, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  return next();
});

// User User router
app.use('/user/', userRouter);
app.use('/products/', productsRouter);
app.use('/orders/', ordersRouter);

// 404 error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// 500 error
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Start server
app.listen(port);
