const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const signupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    profilePictureUrl:{
        type:String,
        default:null
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        default:null
    },
    followers:{
        type:[],
        default:[0]
    },
    following:{
        type:[],
        default:[0]
    },
    mobileVerificationStatus:{
        type:Boolean,
        default:false
    },
    emailVerificationStatus:{
        type:Boolean,
        default:false
    }
    ,
    password:{
        type:String,
        required:true
    }
},{timestamps:true})


    signupSchema.pre("save",async function(next){
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await  bcrypt.hash(this.password,salt)
            this.password = hashedPassword;
            console.log("PASSWORD ENCRYPTED SUCCESSFULLY " +this.password );
            next()
            
        } catch (error) {
            console.log("ERROR WHILE ENCRYPTING THE PASSWORD");
            next(error)
        }
    })


    const User = mongoose.model("user",signupSchema);

module.exports = User

