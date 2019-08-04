const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const ReplaceMe = Schema ({
//     auth_token: {type:String, required: true},
//     sid: {type: String, required: true},
//     phoneNumber: String,
//     message: String
// })

// module.exports = mongoose.model('ReplaceMe', ReplaceMe);

const test = Schema (
    {auth_token: {type: String, required: true},
    sid: {type: String, required: true},
    phoneNumber: String,
    message: String
    }
);

module.exports = mongoose.model('test', test);