const bcrypt = require("bcrypt")
const OTP = require("../modals/otpModal.js")
const USER = require("../modals/signUpModal.js")
async function forgetPasswordOTPVerification(req,res){
    try {
        const {newPassword,confirmPassword,clientOTP} = req.body;
        const responseData = await OTP.findOne({otp:clientOTP})
        console.log(responseData);

        let current  = Date.now()
        let otpDate = responseData[0].createdAt
        let difference = current - otpDate
        
        
        if(responseData == null){
            res.json({
                msg:"Invalid One time Password."
            })
        }else if(responseData.otp !== Number(clientOTP)){
            res.json({
                msg:"Invalid One Time Password."
            })
        }else if(responseData.otp !== Number(clientOTP)){
            res.json({
                msg:"Invalid One Time Password."
            })
        }else{
            if(!newPassword || !confirmPassword){
                res.json({
                    msg:"New password is required."
                })
            }else if(newPassword !== confirmPassword){
                res.json({
                    msg:"New password and confirm password are different."
                })
            }else {
                if(difference < 6*60*1000 == true){
                
                    let salt  = await bcrypt.genSalt(10)
                    let hashPassword = await bcrypt.hash(newPassword,salt)
                    // console.log(hashPassword);
                    // console.log(newPassword);
                    const forgetPasswordChangedResponse = await USER.findOneAndUpdate({email:responseData.email,password:hashPassword})
                    // Deleting One Time Password
                    await OTP.findOneAndDelete({otp:clientOTP})
                    console.log(forgetPasswordChangedResponse);
                    res.json({
                        msg:"Passowrd forgotten successfully."
                    })
                
                }else{
                    res.json({
                        success:false,
                        msg:"Invalid One time password",
                        otpMsg:"One Time Password is expired"
                    })
                }
            }
        }
    } catch (error) {
        res.json({msg:"Error while encrypting password for forget password."})
    }
}



module.exports = forgetPasswordOTPVerification