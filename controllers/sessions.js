// dependencies 

const bcrypt = require('bcrypt');
const express = require('express');
const sessions = require('sessions');
const User = require('../models/users.js');

// new session / log in
sessions.get('/new', (req, resp)=>{
    resp.render('sessions/new.ejs');
});

// creating a user session with sessions.post
sessions.post('/', (req, resp)=>{
    console.log('this is the req.body', req.body);
    console.log('this is the password', req.body.password);
    
    //checking to make sure the user exists
    User.findOne
})