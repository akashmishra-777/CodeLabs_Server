const USER = require("../modals/signUpModal.js")
const sendEmailOTP = require("../helper/nodemailer.js")
async function userEmailLoginOtpSendController(req,res) {
    

        // 
        const {email,password} = req.body;
        if(!email){
            res.json({
                msg:"Email address is required."
            })
        }else if(!password){
            res.json({
                msg:"Passowrd field is required."
            })
        }

        const userData = await USER.find({email})
        if(userData.length !== 0 && userData.length === 1){
            sendEmailOTP(req,res);
        }else{
           res.json({
            msg:"Invalid email address or passowrd."
           })
        }
        
        


    }


module.exports = userEmailLoginOtpSendController