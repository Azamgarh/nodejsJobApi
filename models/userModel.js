const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, 'Please provide name'],
        minlength:1,
        maxlength:20
    },
    email:{
        type:String,
        required:[true, 'Please provide email'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Please enter password'],
        minlength:1,
        maxlength:300
    }

})
module.exports = mongoose.model('User', userSchema);