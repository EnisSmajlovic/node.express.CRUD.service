/* eslint no-underscore-dangle: 0 */

const mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4');

const UserSchema = new mongoose.Schema({
    id : {
        type     : String,
        required : true,
        default  : uuidv4()
    },
    email : {
        type      : String,
        required  : true,
        minlength : 2,
        maxlength : 30
    },
    givenName : {
        type      : String,
        required  : true,
        minlength : 1,
        maxlength : 30
    },
    familyName : {
        type      : String,
        required  : true,
        minlength : 2,
        maxlength : 30
    }
},
{
    timestamps : true,
    versionKey : false
});

module.exports = mongoose.model('User', UserSchema);
