const Hospital = require("../models/HospitalSchema");
const Doctor = require("../models/DoctorSchema");
const User = require("../models/UserSchema");
const Announcement = require("../models/AnnouncementScheme");
const MedicineOrder = require("../models/OrderSchema")

exports.approve = async (req, res) => {
  const { docId } = req.params;
  const { id, role } = req.user;
  // console.log(req.user);
  if (role !== "admin") {
    return res.status(400).send({ message: "Invalid Request" });
  }
  console.log(id);
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      docId,
      { isApproved: "approved" },
      { new: true }
    );
    return res.status(200).json({ success: true, message: "Doctor Approved" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to approve doctor" });
  }
};

exports.cancel = async (req, res) => {
  const { docId } = req.params;
  const { id, role } = req.user;
  // console.log(req.user);
  if (role !== "admin") {
    return res.status(400).send({ message: "Invalid Request" });
  }
  console.log(id);
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      docId,
      { isApproved: "cancelled" },
      { new: true }
    );
    console.log(updatedDoctor);
    return res
      .status(200)
      .json({ success: true, message: "Doctor License Cancelled" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to cancel doctor" });
  }
};

exports.blockUser = async (req, res) => {
  const { userId } = req.params;
  const { id, role } = req.user;
  if (role !== "admin") {
    return res.status(400).send({ message: "Invalid Request" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive: "blocked" },
      { new: true }
    );
    console.log(updatedUser);
    return res.status(200).json({ success: true, message: "User Blocked" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to block the User" });
  }
};

exports.unblockUser = async (req, res) => {
  const { userId } = req.params; 

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: "active" }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User unblocked successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to unblock user" });
  }
};

exports.postAnnouncement = async (req, res) => {
  const { announcementTitle, announcementContent } = req.body; // Adjust field names

  if (!announcementTitle || !announcementContent) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  const { id, role } = req.user;

  if (role !== "admin") {
    return res.status(400).json({
      success: false,
      message: "Invalid Request - Only admins can post announcements",
    });
  }

  try {
    const newAnnouncement = new Announcement({
      title: announcementTitle,
      content: announcementContent,
    });
    const savedAnnouncement = await newAnnouncement.save();

    return res.status(201).json({
      success: true,
      message: "Announcement posted successfully",
      announcement: savedAnnouncement,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to post announcement" });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();

    return res.status(200).json({ success: true, announcements });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve announcements" });
  }
};

exports.deleteHospital = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }
    await Hospital.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Hospital deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete hospital" });
  }
};

exports.approveHospital = async (req, res) => {
  const { hospId } = req.params;
  const { id, role } = req.user;

  if (role !== "admin") {
    return res.status(400).send({ message: "Invalid Request" });
  }
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospId,
      { isApproved: "approved" },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Hospital Approved" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to approve Hospital" });
  }
};

exports.rejectHospital = async (req, res) => {
  const { hospId } = req.params;
  const { id, role } = req.user;
  if (role !== "admin") {
    return res.status(400).send({ message: "Invalid Request" });
  }
  console.log(id);
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospId,
      { isApproved: "cancelled" },
      { new: true }
    );
    console.log(updatedHospital);
    return res
      .status(200)
      .json({ success: true, message: "Hospital License Cancelled" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to reject Hospital" });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const { deliveryStatus } = req.query;
    const query = deliveryStatus !== undefined ? { deliveryStatus: deliveryStatus === 'true' } : {};
    // console.log(query)
    const orders = await MedicineOrder.find(query);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateMedicineDeliveryStatus = async (req, res) => {
  const {orderId} = req.params;

  try {
    const medicineOrder = await MedicineOrder.findById(orderId);

    if (!medicineOrder) {
      return res.status(404).json({ message: 'Medicine order not found' });
    }
    if (medicineOrder.deliveryStatus) {
      return res.status(400).json({ message: 'Medicine order is already delivered' });
    }
    medicineOrder.deliveryStatus = true;
    await medicineOrder.save();
    res.status(200).json({ message: 'Delivery status updated successfully', medicineOrder });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

