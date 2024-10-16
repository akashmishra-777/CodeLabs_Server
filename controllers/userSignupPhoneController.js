const User = require("../modals/signUpModal.js")
const sendOtpViaSMS = require("../helper/otpAPI.js")
 
async function userSignupControllerViaMail(req,res){

    // Destructuring the req.body~
    const {name,email,phone,dob,password,address,username} = req.body

    console.log(req.body);
    
    // Checking if all the required fields are coming in req.body

    if(!name){
        res.json({errorMsg:"Name value is required."})
    }else if(!username){
        res.json({errorMsg:"Username is required."})
    }else if(!email){
        res.json({errorMsg:"Email address is required."})
    }else if(!phone){
        res.json({errorMsg:"Phone number is required."})
    }else if(!dob){
        res.json({errorMsg:"Date of birth is required."})
    }else if(!password){
        res.json({errorMsg:"Password is required."})
    }else if(!address){
        res.json({errorMsg:"Address is required."})
    }else{
       // Sending Phone based otp for signup
    //try black
        try {
            sendOtpViaSMS(req,res);
        }catch (error) {
           res.json({errorMsg:`Error while creating a new user ${error}`})
        }
    }
}








module.exports = userSignupControllerViaMail