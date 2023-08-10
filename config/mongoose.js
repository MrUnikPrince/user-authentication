const mongoose = require('mongoose');

const url = "mongodb+srv://UniquePrince:32323212@cluster0.sezsu7p.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to the database');
})
.catch((error) => {
    console.error('Error in connecting to the database:', error);
    process.exit(1); // Exit the application with an error code
});

const db = mongoose.connection;
db.on('Error', console.error.bind(console, 'Error connecting to MongoDb'));

db.once('open', () => {
    console.log('Connected to the database');
})
module.exports = db;
