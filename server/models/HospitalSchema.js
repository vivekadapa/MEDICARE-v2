const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  phoneNumber: [
    {
      type: Number,
      required: true,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  socials: {
    type: [
      {
        name: String,
        url: String,
      },
    ],
    default: [],
  },
  doctors: [
    {
      type: Number,
      required:true
    },
  ],
  patients: [
    {
      type: Number,
      required: true
    },
  ],
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
});

const HospitalModel = mongoose.model("HospitalModel", HospitalSchema);

module.exports = HospitalModel;
