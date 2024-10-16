const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    otp:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        default:null
    },
    phone:{
        type:Number,
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})



const otp = mongoose.model("otp",otpSchema)


module.exports = otp



