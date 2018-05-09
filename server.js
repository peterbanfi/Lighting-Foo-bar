const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./config/database.js');
const User = require('./models/user');
const userRouter = require('./route/user.route');
const blogpostRouter = require('./route/blogpost.route');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();

// Logging
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
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

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

// Cookie handling
app.use(cookieParser());

// Session handling
app.use(cookieSession({
    secret: 'YOUR_SECRET_KEY',

    cookie: {
        secure: false,
        maxAge: 36000
    },
}));

// Passport Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(
    db.uri, db.options,
    () => {
        console.log('MongoDB connected.');
    },
    (err) => {
        console.error(`MongoDB error.:${err}`);
    },
);



// Enable CORS
app.use(cors());

// User User router
app.use('/user/', userRouter);
app.use('/blogpost/', blogpostRouter);

// Start server
app.listen(port);
console.log(`The magic happens on port ${port}`);