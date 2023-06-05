// import needed packages
const express = require("express");
const cors = require('cors');

// Create Routes
const userRoutes = require('../routes/users');
const welcomeRoute = require('../routes/welcome');
const noteRoute = require('../routes/note');




// Setup db and environment
require('../db/mongoose');
require('dotenv').config();

// Initialize express
const app = express();
app.use(express.json());

// Setup port
const port = process.env.PORT;


// Allow cross-origin 
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// Setup route paths
app.use('/', welcomeRoute);
app.use('/api/auth', userRoutes);
app.use('/api/note', noteRoute);



// Start api and listen on port
app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
})