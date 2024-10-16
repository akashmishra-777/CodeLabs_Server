const express = require("express")
const router = express.Router()
const userSignupControllerViaMail = require("../controllers/userSignupEmailController.js")
const userSignupControllerViaPhone = require("../controllers/userSignupPhoneController.js")
const userOtpVerificationSystem = require("../controllers//userOtpVerificationController.js")
const forgetPaswordSendOTP = require("../controllers/forgetPasswordSendOTPController.js")
const forgetPasswordOTPVerification = require("../controllers/forgetPasswordOTPVerification.js")
const userEmailLoginOtpSendController= require("../controllers/userEmailLoginOtpSendController.js")
const userPhoneLoginOtpSendController = require("../controllers/userPhoneLoginOtpSendController.js")
const userLoginOtpVerificationController = require("../controllers/userLoginOtpVerificationController.js")

router.post("/signupWithPhone",userSignupControllerViaPhone)

router.post("/signupWithEmail",userSignupControllerViaMail)

router.post("/signupOTPVerification",userOtpVerificationSystem)

router.post("/forgetPaswordSendOTP",forgetPaswordSendOTP)

router.post("/forgetPasswordOTPVerification",forgetPasswordOTPVerification)

router.post("/loginWithEmail",userEmailLoginOtpSendController)

router.post("/loginWithMobile",userPhoneLoginOtpSendController)

router.post("/loginOtpVerification",userLoginOtpVerificationController)

router.get("/signup",(req,res)=>{
    
    res.send("Welcome to the signup page")
})








module.exports = router;