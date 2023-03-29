const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
 
    name:{
        type:String,
        required:true
    },
    lastname:String,
    age:Number
})

module.exports = mongoose.model("user",UserSchema)