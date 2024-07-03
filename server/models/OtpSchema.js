const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 5,
  },
});

const sendVerificationMail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(
      email,
      "Verfication Email for Medicare",
      `<h1>Please confirm your OTP</h1>
     <h2>Here is your OTP code: ${otp}</h2>`
    );
    console.log("Email Sent Successfully" + mailResponse);
  } catch (error) {
    console.log("Error Occurred while sending mail" + error);
  }
};

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  if (this.isNew) {
    await sendVerificationMail(this.email, this.otp);
  }
  next();
});

const OtpModel = mongoose.model("OtpModel", otpSchema);

module.exports = OtpModel;
