const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const newNumber = Schema({
    name: {type: String, required: true},
    phoneNumber: {type: Number, required: true}
});

module.exports = mongoose.model('newNumber', newNumber);
