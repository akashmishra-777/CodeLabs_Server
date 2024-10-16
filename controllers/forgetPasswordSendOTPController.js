const SEND_OTP = require("../helper/forgetPasswordOTPapi.js")
const USER = require("../modals/signUpModal.js")
async function forgetPaswordSendOTP(req,res) {
    try {
        const {email} = req.body;
        if(!email){
            res.json({
                errMsg:"Email address is required"
            })
        }else{
            const responseData = await USER.findOne({email:email})
           if(responseData == null){
            res.json({
                msg:"Email address is not registered."
            })
           }else{
            SEND_OTP(res,responseData.name,responseData.email);
            res.json({msg:"OTP sent successfully",booleanResponse:true})
           }
        }
    } catch (error) {
        res.json({
            error:error
        })
    }
}


module.exports = forgetPaswordSendOTP