const express = require('express');
const port = 8000;
const app = express();

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
})