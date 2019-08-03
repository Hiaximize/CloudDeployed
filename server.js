//___________________
//Dependencies
//___________________
const express = require('express');
const cmd = require('node-cmd')
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const user = require('./models/users.js')
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________      
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = "mongodb+srv://test:0df8faa163ac497329ea2c3833f6eec9@firstcluster-xus9s.mongodb.net/Unit2-Project-Database.TEST?retryWrites=true&w=majority";

// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________




//localhost:3000
app.get('/', (req, resp) => {
    
    resp.render('index.ejs');
    
});


 
app.post('/', (req, resp)=>{

    
    user.create({auth_token: req.body.authToken,
        sid: req.body.sid,
    phoneNumber: req.body.phoneNumber,
    message: req.body.message}, (error, newData)=>{
    if (error){
        console.log(error);
        } 
    else {
        resp.send(newData)
    }
    
})

app.get('/call', (req,resp)=>{
    const accountSid = req.body.sid;
const authToken = req.body.auth_token;
const client = require('twilio')(accountSid, authToken);

client.messages(req.body.message)
      .fetch()
      .then(message => console.log(message.body));
})


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

