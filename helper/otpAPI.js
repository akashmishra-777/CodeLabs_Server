const otpGenerator = require("otp-generator")
const OTP  = require("../modals/otpModal.js")

async function sendOtpViaSMS(req,res) {
   let OneTimePassword = otpGenerator.generate(6,{
    lowerCaseAlphabets:false,
    upperCaseAlphabets:false,
    specialChars:false
   })

   OneTimePassword = Number(OneTimePassword)

  try {
    fetch(`https://smsc.co.in/api/mt/SendSMS?APIKey=${process.env.SMS_API_KEY}&senderid=MARSKY&channel=2&DCS=0&flashsms=0&number=91${req.body.phone}&text=${OneTimePassword}%20is%20your%20One-Time%20Password%20(OTP).%20-Sky%20Marketing&route=50`)

    await OTP.create({
      otp:OneTimePassword,
      phone:req.body.phone,
    })
    
   res.send({msg:"OTP has been sent successfully"})
  } catch (error) {
   res.json({errorMsg : "ERROR WHILE SENDING _ SMS OTP "+error
   })
  }
}

module.exports = sendOtpViaSMS