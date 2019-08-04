const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const env = require('dotenv');
env.config();
const test = require('./models/test.js');
const newNumb = require('./models/newNumber.js');




///////////////////Middleware/////////////////////////
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

const PORT = process.env.PORT || 3000;


///////////MONGO & MONGOOSE DEPENDENCIES//////////////////////
const mongoose = require('mongoose');
const MONGODB_URI = process.env.mongoDB_URI; // change to MONGODB_URI to use cloud Atlas && mongo_URI for mongodb
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

// index page
app.get('/', (req, resp)=>{
    resp.render('index.ejs');
    console.log(req.body);
});

app.get('/new', (req, resp)=>{
    resp.render('new.ejs');
})


app.post('/new', (req, resp)=>{
    newNumb.create(req.body, (error, newNumber)=>{
        console.log(error);
        console.log(newNumber);
        resp.redirect('/');
    })
    
    
});

//check out xml builder of some kind. see if there is a way to host an xml file here at this link and then reference this in api call
app.get('/call', (req, resp)=>{
    resp.send(req.body);
})

// post goes here
app.post('/', (req, resp)=>{
    test.create(req.body, (error, testData)=>{
        let callMessage;
        if(req.body.skynet == 'on'){
            req.body.skynet = true;
            callMessage = 'https://waterspout-bullfrog-1511.twil.io/assets/skynet.xml';
        }
        else {
            req.body.skynet = false;
        }
        if(req.body.dontSpam == 'on'){
            req.body.skynet = false;
            req.body.dontSpam = true;
            callMessage = 'https://waterspout-bullfrog-1511.twil.io/assets/dontBeASpammer.xml';
        }
        else {
            req.body.dontSpam = false;
        }

        if(error){
            console.log(error);
        }

        const accountSid = req.body.sid;
        const authToken = req.body.auth_token;
        const client = require('twilio')(accountSid, authToken);

        client.calls
            .create({
               url: String(callMessage),
                to: String(req.body.phoneNumber),
                from: '+12028949849'
            })
            .then(call => console.log(call.sid));
                console.log(testData);
             });
    resp.redirect('/');
});

///////////////////////////////////////////////////
// delete needs some work..not currently deleting
app.delete('/:id', (req, resp)=>{
    test.findByIdAndRemove(req.params.id, (error, deletedNumber)=>{
        console.log(deletedNumber);
        resp.redirect('/show');
    })
})

app.get('/:id/edit', (req, resp)=>{
    resp.render('edit.ejs');
})

app.get('/:id', (req, resp)=>{
    test.find({}, (error, data)=>{
        if(error){
            console.log(error);
        }
        resp.render('show.ejs', {numbers:data});
    })
    
})


app.put('/:id', (req, resp)=>{
    resp.send('update route');
})

////////////////listen port///////////////////

app.listen(PORT, ()=>{
    console.log("Listening on port: ", PORT);
});