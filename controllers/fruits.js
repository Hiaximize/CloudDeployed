const express = require('express')
const router = express.Router()
const Fruit = require('../models/fruits.js');


router.delete('/:id', (req, resp)=>{
    Fruit.findByIdAndRemove(req.params.id, (error, deletedFruit)=>{
        resp.redirect('/fruits')
    });
});

router.get('/new', (req, res) => {
    res.render('new.ejs');
});

router.put('/:id', (req, resp)=>{
    // changes the info in the database
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedData)=>{
    resp.redirect('/fruits');
    });
});


router.get('/', (req, res) => {
    Fruit.find({}, (error, allFruits) => {
        res.render('index.ejs',{
            fruits:allFruits
        });
    });
});

router.get('/:id/edit', (req, resp)=>{

    //find and update
    Fruit.findById(req.params.id, (error, foundFruit)=>{
    resp.render('edit.ejs', {fruit:foundFruit});
    });
});

router.get('/:id', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
        res.render('show.ejs',{
            fruit:foundFruit
        });
    });
});

router.post('/', (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
      }
    Fruit.create(req.body, (error, createdFruit) => {
        res.redirect('/fruits');
    });
});

module.exports = router;