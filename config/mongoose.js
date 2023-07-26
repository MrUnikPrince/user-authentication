const mongoose = require('mongoose');

// let's connect with database 
mongoose.connect("mongodb://localhost/User",{useNewUrlParser: true,
useUnifiedTopology: true,})
.then(() =>{
    console.log('Connected to the database');
}).catch((err) => {
    console.error('Error in connecting to the database ');
})