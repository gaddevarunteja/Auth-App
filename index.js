const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// set up static folders
app.use(express.static(path.join(__dirname, './assets')));

// set ejs view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use middleware for ejs layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use('/', require('./routes'));

// start listening on port
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running server ${err}`);
        return;
    }
    console.log(`Server is listening on port ${port}`);
});