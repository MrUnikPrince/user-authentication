const express = require('express');  // importing express
const port = 8000;
const db = require('./config/mongoose');   // importing db connection 
const expressLayouts = require('express-ejs-layouts');
const app = express();
const sassMiddleware = require('node-sass-middleware');  // using sass middle wate for scss

app.use(sassMiddleware({
    src : './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
// let's use express layouts
app.use(expressLayouts);
// extract style and scripts form sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// view engine
app.set('view engine', 'ejs');
app.set('views','./views');

// routes
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err){
        console.error(`Error in running server ${err}`);
    }
    console.log(`Server is running ${port}`);
})