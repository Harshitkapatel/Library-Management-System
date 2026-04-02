const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

    subscriptionDate:{
        type: String,
        required: true
    },

    subscriptionType:{
        type: String,
        required: true
    },

    issuedBook:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: false
    },

    issuedDate:{
        type: String,
        required: false
    },

    returnDate:{
        type: String,
        required: false
    },
    
    address:{
        type: String,
        required: true
    }
    


},{timestamps: true})

module.exports = mongoose.model("User", userSchema)
