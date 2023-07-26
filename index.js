const express = require('express');  // importing express
const port = 8000;
const db = require('./config/mongoose');   // importing db connection 
const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, (err) => {
    if(err){
        console.error(`Error in running server ${err}`);
    }
    console.log(`Server is running ${port}`);
})