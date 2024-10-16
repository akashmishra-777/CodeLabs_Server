const nodemailer = require("nodemailer")
const otpGenerator = require("otp-generator")
const OTP  = require("../modals/otpModal.js")

async function forgetPasswordOTP(res,name,email){

    let OneTimePassword = otpGenerator.generate(6,{
        lowerCaseAlphabets:false,
        upperCaseAlphabets:false,
        specialChars:false
    })

    OneTimePassword = Number(OneTimePassword)

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "codelabs.services@gmail.com",
          pass: "rylaaxpystautyii",
        },
      });
    
      const mailOptions = {
        from: "igl.akashmishra@gmail.com",
        to:email,
        subject: "CodeLabs One Time Password Service.",
        html: `<p>Dear <b>${name}</b>, your forget password OTP (One Time Password) is :<h2> ${OneTimePassword}</h2> It is valid only for 5 minutes. Please do not share it with anyone.</p>
            <p><b>For any kind of help feel free to contact us.</b></p><p>At : <a href="mailto:customer.support.codelabs@gamil.com">customer.support.codelabs</a> </p><p>Thank You.</p>
            <p><i>By <b>CodeLabs</b></i></p>`,
      };


      transporter.sendMail(mailOptions, async(err, info) => {
       if(err){
        res.json({errorMsg:"ERROR WHILE SENDING EMAIL OTP"})
       }else{
        await OTP.create({
          otp:OneTimePassword,
          email:email,
        })
        res.json({msg:info})
        console.log({msg:"OTP SENT SUCCESSFULLY"})
       }
      })


      
}




module.exports = forgetPasswordOTP
