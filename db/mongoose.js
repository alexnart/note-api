const mongoose = require("mongoose");
require('dotenv').config();

const mongoString = process.env.MONGODB_URL

// console.log("mongoUrl", mongoString);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
});

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})