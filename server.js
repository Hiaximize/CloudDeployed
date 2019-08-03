const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// this must be below the middleware. Its going to go into the fruits.js files before it has a chance to get to the middleware
const fruitsController = require('./controllers/fruits.js');

// once we require the fruitsController we have to 'use' it before it's acceptable. By having '/fruits/' prarameter in here, we can remove /fruits from all the routers routes in fruits.js. It tells the express app that everything will automatically include /fruits. 
app.use('/fruits/', fruitsController);


app.listen(3000, () => {
    console.log('listening...');
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
