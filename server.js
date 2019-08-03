const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// const character = require('./models/characterId.js');


///////////////////Middleware/////////////////////////
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

const PORT = process.env.PORT || 3000;

// index page
app.get('/index', (req, resp)=>{
    resp.render('index.ejs');
});

app.get('/new', (req, resp)=>{
    resp.send('new');
})

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