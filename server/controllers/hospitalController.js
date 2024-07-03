const Hospital = require("../models/HospitalSchema.js");

exports.createHospital = async (req, res) => {
  const {
    name,
    address,
    pinCode,
    phoneNumber,
    email,
    socials,
    doctors,
    patients,
  } = req.body;

  try {
    const newHospital = new Hospital({
      name,
      address,
      pinCode,
      phoneNumber,
      email,
      ...(socials && { socials }),
      ...(doctors && { doctors }),
      ...(patients && { patients }),
    });

    const savedHospital = await newHospital.save();
    res.status(201).json({
      success: true,
      message: "Hospital created successfully",
      data: savedHospital,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create hospital" });
  }
};


exports.getAllHospitals = async (req, res) => {
  try {
    const { isApproved } = req.query;

    let filter = {};

    if (isApproved) {
      filter = { isApproved };
    }

    const hospitals = await Hospital.find(filter);
    res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch hospitals" });
  }
};


exports.searchHospitalByName = async (req, res) => {
  const { name } = req.query;

  try {
    const hospitals = await Hospital.find({
      name: { $regex: new RegExp(`^.*${name}.*$`) },
      approved: true,
    });
    if (hospitals.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No hospitals found with that name" });
    }
    res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    //console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to search for hospitals" });
  }
};

exports.getHospitalDetails = async (req, res) => {
  console.log("getHospitalDetails");
  const  {id}  = req.params;
  console.log(id);
  try {
    const hospital = await Hospital.findById({ _id: id }).populate([
      "doctors",
      "patients",
    ]);
    if (!hospital) {
      return res.status(400).json({
        success: false,
        message: "Hospital not found",
      });
    }
    return res.status(200).json({
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addHospitalContacts = async (req, res) => {
  const { id } = req.params;
  const { phoneNumber, socials } = req.body;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    if (phoneNumber) {
      if (Array.isArray(phoneNumber)) {
        hospital.phoneNumber = [...hospital.phoneNumber, ...phoneNumber];
      } else {
        hospital.phoneNumber = [...hospital.phoneNumber, phoneNumber];
      }
    }

    if (socials) {
      if (Array.isArray(socials)) {
        hospital.socials = [...hospital.socials, ...socials];
      } else {
        hospital.socials = [...hospital.socials, socials];
      }
    }
    await hospital.save();
    res.status(201).json({
      success: true,
      message: "Hospital contacts added successfully",
      data: hospital,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add hospital contacts" });
  }
};

exports.updateHospital = async (req, res) => {
  const { id } = req.params;
  const { name, address, pinCode, phoneNumber, email, socials } = req.body;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }

    hospital.name = name || hospital.name;
    hospital.address = address || hospital.address;
    hospital.pinCode = pinCode || hospital.pinCode;
    hospital.phoneNumber = phoneNumber || hospital.phoneNumber;
    hospital.email = email || hospital.email;
    hospital.socials = socials || hospital.socials;

    await hospital.save();
    res.status(201).json({
      success: true,
      message: "Hospital updated successfully",
      data: hospital,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update hospital" });
  }
};
