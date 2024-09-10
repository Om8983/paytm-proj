const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://omWadhi64:7gFI_%40oM&123@cluster0.pl3kem8.mongodb.net/users')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    firstname : {
        type : String,
        required : true,
        trim : true
    }, 
    lastname : {
        type : String,
        required : true,
        trim : true
    },
    password: {
        type : String,
        required : true,
        trim : true
    }
})

const balanceSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true,
        unique :  true
    },
    balance : {
        type : Number,
        required : true
    }
})

const User = mongoose.model('users', userSchema);
const Account = mongoose.model('userBalance', balanceSchema)
module.exports = {User, Account}