const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const test = Schema (
    {auth_token: {type: String, required: true},
    sid: {type: String, required: true},
    phoneNumber: {type: Number, required: true, min:1000000000, max:9999999999},
    note: String,
    skynet: String,
    flood: String,
    dontSpam: String
    }, {timestamp: true}
);

module.exports = mongoose.model('test', test);