const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const env = require('dotenv');
env.config();
const test = require('./models/characters.js');
const newNumb = require('./models/newNumber.js');



///////////////////Middleware/////////////////////////
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

const PORT = process.env.PORT || 3000;


///////////MONGO & MONGOOSE DEPENDENCIES//////////////////////
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI; // change to MONGODB_URI to use cloud Atlas
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


///////////////////ROUTES/////////////////////////////////////////

// function getMessage(){

// }

// index page
app.get('/', (req, resp)=>{
    resp.render('index.ejs');
    console.log(req.body);
});

app.get('/new', (req, resp)=>{
    resp.render('new.ejs');
})


// app.post('/new', (req, resp)=>{
//     newNumb.create(req.body, (error, newNumber)=>{
//         console.log(error);
//     })
//     console.log(newNumber);
//     resp.redirect('/');
// });

app.get('/call', (req, resp)=>{
    resp.send(req.body);
})

// post goes here
app.post('/', (req, resp)=>{
    test.create(req.body, (error, testData)=>{
        if(error){
            console.log(error);
        }
        // insert api call here with data from form
        // console.log();

        const accountSid = req.body.sid;
        const authToken = req.body.auth_token;
        const client = require('twilio')(accountSid, authToken);

        client.calls
            .create({
                url: 'http://demo.twilio.com/docs/voice.xml',
                to: String(req.body.phoneNumber),
                from: '+12028949849'
            })
            .then(call => console.log(call.sid));
                console.log(testData);
             });
    resp.redirect('/');
});

///////////////////////////////////////////////////

app.get('/:id', (req, resp)=>{
    test.
    resp.render('show.ejs');
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