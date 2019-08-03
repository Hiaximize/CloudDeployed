const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = Schema({
    auth_token: {type: String, required: true},
    sid: {type: String, required: true},
    phoneNumber: Number,
    message: String
});

module.exports = mongoose.model('schema', schema);
