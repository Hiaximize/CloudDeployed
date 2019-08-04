const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const env = require('dotenv');
env.config();
// const character = require('./models/characterId.js');



// /////////////CODE FROM INTERNET//////////////////////
// var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// }).listen(8080, "0.0.0.0");
// console.log('Server running at http://0.0.0.0:8080/');



///////////////////Middleware/////////////////////////
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

const PORT = process.env.PORT || 3000;

// index page
app.get('/', (req, resp)=>{
    resp.render('index.ejs');
});

app.get('/new', (req, resp)=>{
    resp.send('new.ejs');
})

///////////MONGO & MONGOOSE DEPENDENCIES//////////////////////
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI; // changed from mongo_URI
const db = mongoose.connection;
const schema = mongoose.Schema;
mongoose.connect(MONGODB_URI, {useNewUrlParser:true});
mongoose.Promise = global.Promise;

db.on('error', (error)=>{
    console.log(error.message + 'is Mongo not running?');
});

db.on('connected', ()=>{
    console.log("successfully connected to: ", MONGODB_URI);
});

db.on('disconnect', ()=>{
    console.log("mongod disconnected");
});
////////////////////////////////////////////////////////////

// post goes here

////////////////////////

app.get('/:id', (req, resp)=>{
    resp.send('id page');
})

app.get('/:id/edit', (req, resp)=>{
    resp.send('hello edit route');
})

app.put('/:id', (req, resp)=>{
    resp.send('update route');
})

////////////////listen port///////////////////

app.listen(PORT, ()=>{
    console.log("Listening on port: ", PORT);
});