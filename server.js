// REQUIRE DEPENDENCIES

const express = require("express"); // requires express
const app = express(); // creates app functions
require('dotenv').config(); // needed to recognize variables in .env

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// MIDDLEWARE

// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));



// INDEX

// NEW

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW

// LISTENER
const PORT = process.env.PORT; // calls port variable from .env to protect our data
// note to self: nwws to call this variable AFtER requiring .env or it will show up as undefined

app.listen(PORT, function(){
    console.log(`Let's start selling on port ${PORT}`)
});