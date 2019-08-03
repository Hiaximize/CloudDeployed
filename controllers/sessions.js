// // dependencies 

// const bcrypt = require('bcrypt');
// const express = require('express');
// const sessions = require('sessions');
// const User = require('../models/users.js');

// // new session / log in
// sessions.get('/new', (req, resp)=>{
//     resp.render('sessions/new.ejs');
// });

// // creating a user session with sessions.post
// sessions.post('/', (req, resp)=>{
//     console.log('this is the req.body', req.body);
//     console.log('this is the password', req.body.password);
    
//     //checking to make sure the user exists. 
//     User.findOne({ username: req.body.username}, (error, foundUser)=>{
//         if (error){
//             console.log(error);
//         }
//         else if (!foundUser){
//             resp.send("incorrect credentials");
//         }
//         else {
//             // checking passwords
//             if (bcrypt.compareSync(req.body.password, foundUser.password)){
//                     // adding user to current session
//                     req.session.currentUser = foundUswer;
//                     resp.redirect('/');
//             }
//             resp.send('<a href="/">Try again</a>')
//         }
//     })
// });

// // destroys the current session

// sessions.post('/', (req, resp)=>{
//     req.session.destroy(()=>{
//         resp.redirect('/');
//     });
// });

// module.exports = sessions