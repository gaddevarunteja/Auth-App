const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, './assets')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.get('/', (req, res) => {
    return res.send('Hello World');
});

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running server ${err}`);
        return;
    }
    console.log(`Server is listening on port ${port}`);
});