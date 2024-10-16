const OTP = require("../modals/otpModal.js")
const USER = require("../modals/signUpModal.js")
const jwt = require("jsonwebtoken")
async function userLoginOtpVerificationController(req,res){
    const {otp} = req.body;
    if(!otp){
        res.json({
            msg:"One time password is required"
        })
    }

    const otpData = await OTP.find({otp})
    
    
    if (otpData.length !== 0){
        
        let current  = Date.now()
        let otpDate = otpData[0].createdAt
        let difference = current - otpDate
        
        
        

       if(difference < 6 * 60 * 1000 == true){
        const userData = await USER.find({$or:[{email:otpData[0].email},{phone:otpData[0].phone}]})

        let userDataForJWT = {
            _id:userData[0].id,
            username:userData[0].username,
            phone:userData[0].phone,
            email:userData[0].email
        }

        
        

      if(userData.length !== 0){
        // Generating Refresh and Access Token -- Start
        // 
        
            const accessToken = await jwt.sign(userDataForJWT,process.env.JWT_SECRET,{expiresIn:"1h", algorithm:"HS256"})
        
            const refreshToken = await jwt.sign(userDataForJWT,process.env.JWT_SECRET,{expiresIn:"1d", algorithm:"HS256"})
        
            // await OTP.findOneAndDelete({otp:req.body.otp})
        //   
        // Closing of token generation


        res.status(200).json({
            success:true,
            msg:"Login Successfull",
            accessToken:accessToken,
            refreshToken:refreshToken,

        })
      }else{
        res.status(401).json({
            msg:"User Not Found Related To This OTP"
        })
      }
       }else{
        res.json({
            msg:"Invalid One Time Password",
            success:false,
            otpMsg:"Your One Time Password is Expired"
        })
       }
       
        
    }else{
        res.status(401).json({
            msg:"Invalid One Time Password",
            otpVerificationStatus : false
        })
    }
    
}



module.exports = userLoginOtpVerificationController