const express = require('express');
const port = 8000;
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-strategy');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// set up static folders
app.use(express.static(path.join(__dirname, './assets')));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css"));

// set ejs view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// use middleware for ejs layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(session({
    name: 'AuthApp',
    secret: 'secret-key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 10)
    },
    store: MongoStore.create({
        mongooseConnection: db,
        mongoUrl: process.env.MONGODB_URI,
        autoRemove: 'disabled'
    }, function(err) {
        if(err) { console.log(err)}
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));

// start listening on port
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running server ${err}`);
        return;
    }
    console.log(`Server is listening on port ${port}`);
});