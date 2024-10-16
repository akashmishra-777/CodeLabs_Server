const USER = require("../modals/signUpModal.js")
const sendPhoneOtp = require("../helper/otpAPI.js")
async function userEmailLoginOtpSendController(req,res) {
    

        // 
        const {phone} = req.body;
        if(!phone){
            res.json({
                msg:"Mobile number is required."
            })
        }

        const userData = await USER.find({phone})
        if(userData.length !== 0 && userData.length === 1){
            sendPhoneOtp(req,res);
        }else{
           res.json({
            msg:"Invalid email address or passowrd."
           })
        }
        
        


    }


module.exports = userEmailLoginOtpSendController