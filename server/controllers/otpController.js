const otpGenerator = require('otp-generator');
const UserModel = require('../models/UserSchema');
const OtpModel = require('../models/OtpSchema');
const DoctorModel = require('../models/DoctorSchema');



exports.sendOtp = async(req,res)=>{
    try {
        console.log(req.body);
        const {email} = req.body;

        const checkUserPresent = await UserModel.findOne({email});
        const checkDoctorPresent = await DoctorModel.findOne({email})
        if(checkUserPresent || checkDoctorPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Exists"
            });
        }

        const checkUserInOtp = await OtpModel.findOne({email})
        if(checkUserInOtp){
            const removeOtp = await OtpModel.findOneAndDelete({email});
            console.log(removeOtp)
        }

        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const otpPayload = {email,otp};
        const otpBody = await OtpModel.create(otpPayload);
        return res.status(200).json({
            success:true,
            message:"OTP SENT SUCCESSFULLY"
        })
    } catch (error) {
        console.log("Hello")
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}



exports.verifyOtp = async(req,res)=>{
    try {
        console.log(req.body);
        const {email,otp} = req.body;
        const user = await OtpModel.findOne({email});
        if(user.otp == otp){
            return res.status(200).json({
                success:true,
                message:"Verified Successfully"
            })
        }
        
        return res.status(401).json({success:false,message:"Incorrect Otp"})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:error.message})
    }
}