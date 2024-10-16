const OTP = require("../modals/otpModal.js")
const USER = require("../modals/signUpModal.js")
async function userOtpVerificationSystem(req,res) {
    try {
        const {name,email,phone,dob,password,address,username,otp} = req.body

        // console.log(req.body);
        
        // Checking if all the required fields are coming in req.body
    
        if(!name){
            res.json({errorMsg:"Name value is required."})
        }else if(!username){
            res.json({errorMsg:"User name is required."})
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
        }else if(!otp){
            res.json({errorMsg:"One time password is required."})
        }else{
            // Main Verification Code
            const response = await OTP.findOne({otp:otp})
            // console.log(response);
            if(response){
            console.log(otp+ email+phone);
            console.log(response);
            
            
            if(response.otp === Number(otp) && (response.email == email || response.phone == phone) ){
               
                if(difference < 6 * 60 * 1000 == true){
                    const userCheckResponse =  await USER.findOne({$or:[{username:username},{phone:phone},{email:email}]                })
                     console.log("safnlsnflnsdlfnslfnsdnlfnds" + userCheckResponse);
               
                     if(userCheckResponse == null){
               try {
                await USER.create({
                    
                    name:name,
                    email:email,
                    phone:phone,
                    dob:dob,
                    password:password,
                    address:address,
                    username:username
                })

                await OTP.findOneAndDelete({otp:otp})

                res.json({
                    msg:"User created successfully",
                    booleanResponse : true
                })

               } catch (error) {
                res.json({
                    err:error,
                    msg:"Error while creating a user"
                })
                }
                     }else{
                res.json({
                    msg:"User Already exists."
                })
                    }
                }else{
                    res.josn({
                        msg:"Invalid One Time Password",
                        success:false,
                        otpMsg:"One Time Password has expired."
                    })
                }
                
                
            }else{
                res.json({
                    msg:"Invalid One time passwordxx",
                    booleanResponse : false
                })
            }
            }else{
                res.json({
                    msg:"Invalid One time passwordx",
                    booleanResponse : false
                }) 
            }
            


            // Closing of main verification code
        }
    } catch (error) {
        res.json({err:"Error while verifying otp",error:error})
        
    }
}

module.exports = userOtpVerificationSystem