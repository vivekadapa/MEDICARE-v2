const Doctor = require("../models/DoctorSchema");
const Appointment = require("../models/AppointmentSchema");

const { Redis } = require("@upstash/redis");

// Load environment variables
const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_URL;
const UPSTASH_REDIS_TOKEN = process.env.UPSTASH_REDIS_TOKEN;

// Create a new Redis client
const client = new Redis({
    url: UPSTASH_REDIS_URL,
    token: UPSTASH_REDIS_TOKEN
});

exports.getDoctorDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id).select("-password");
        if (!doctor) {
            return res
                .status(400)
                .json({ success: false, message: "Doctor not found" });
        }
        return res.status(200).json({ doctor });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateDoctor = async (req, res) => {
    const { id } = req.user;
    console.log(req.body);
    const { newUser } = req.body;
    console.log(newUser);
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: newUser },
            { new: true }
        );
        console.log(updatedDoctor);
        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            data: updatedDoctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to Update" });
    }
};

// exports.getAllConsultDoctors = async (req, res) => {
//     try {
//         const { isApproved } = req.query;

//         // Check if data exists in Redis cache
//         const cachedData = await client.get(`doctors:${isApproved}`);
//         if (cachedData) {
//             // Cache hit: Data found in cache
//             console.log("Data found in cache");
//             const doctors = cachedData;
//             res.status(200).json({ success: true, data: doctors });
//         } else {
//         // Cache miss: Data not found in cache, query the database
//         const doctors = await Doctor.find({ isApproved }).populate({
//             path: "reviews",
//             populate: {
//                 path: "user",
//                 model: "UserModel",
//                 select: "name email photo",
//             },
//         });

//         // Store data in Redis cache
//          await client.set(`doctors:${isApproved}`, doctors);

//         console.log("Data fetched from database");
//         res.status(200).json({ success: true, data: doctors });
//      }
//     } catch (error) {
//         console.log("Error fetching doctors:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch doctors",
//         });
//     }
// };

exports.getAllConsultDoctors = async (req, res) => {
    try {
        const { isApproved } = req.query;
        console.log(isApproved);

        const doctors = await Doctor.find({ isApproved }).populate({
            path: 'reviews',
            populate: {
                path: 'user',
                model: 'UserModel',
                select: 'name email photo'
            }
        });
        console.log(doctors);
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        console.log("Error fetching doctors:", error);
        res.status(500).json({ success: false, message: "Failed to fetch doctors" });
    }
};


exports.getAllDoctors = async (req, res) => {
    try {
        const { isApproved } = req.query;

        let filter = {};

        if (isApproved) {
            filter = { isApproved };
        }

        const doctors = await Doctor.find(filter).populate({
            path: "reviews",
            populate: {
                path: "user",
                model: "UserModel",
                select: "name email photo",
            },
        });

        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        // console.log("Error fetching doctors:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch doctors",
        });
    }
};


exports.getdoc = async (req, res) => {
    try {
        const id = req.params.id;
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        return res.status(200).json({
            data: doctor,
            success: true
        });
    } catch (err) {
        console.error("Error fetching doctor:", err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


exports.updateAppointment = async (req, res) => {
    console.log(req.user);
    console.log(req.params);
    const { id } = req.user;
    const { appointid, status } = req.params;
    try {
        const doctor = await Doctor.findById(id)
            .select("-password")
            .populate({
                path: "appointments",
                model: "AppointmentModel",
                populate: {
                    path: "user",
                    model: "UserModel",
                },
            });
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            { _id: appointid },
            { status: status }
        );
        console.log(updatedAppointment);
        res.status(200).json({
            success: true,
            message: "Appointment Updated",
            doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error In updating Appointment",
        });
    }
};

exports.getNewAppointments = async (req, res) => {
    const { id } = req.user;
    try {
        const doctor = await Doctor.findById(id).populate({
            path: "appointments",
            model: "AppointmentModel",
            populate: {
                path: "user",
                model: "UserModel",
            },
        });
        console.log(doctor);
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching Appointments",
        });
    }
};

exports.getNewAppointmentsWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id).populate({
            path: "appointments",
            model: "AppointmentModel",
            populate: {
                path: "user",
                model: "UserModel",
            },
        });
        res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in fetching Appointments",
        });
    }
};

exports.manageSlots = async (req, res) => {
    const { daySlots } = req.body;
    console.log(daySlots);

    try {
        const doctorId = req.user.id;
        const doctor = await Doctor.findById(doctorId);
        doctor.timeSlots = daySlots;
        await doctor.save();
        res.status(200).json({ message: "Slots added successfully", doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.addBio = async (req, res) => {
    const { id } = req.user;
    const { bio, ticketPrice } = req.body;
    try {
        const doctor = await Doctor.findByIdAndUpdate(id, { bio, ticketPrice });
        res.status(200).send({
            message: "Bio added successfully",
            data: doctor,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error adding bio", success: false });
    }
};

exports.updateDoctorWId = async (req, res) => {
    const { id } = req.params;
    const updatedDoctorDetails = req.body;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: updatedDoctorDetails },
            { new: true }
        );
        console.log(updatedDoctor);
        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            data: updatedDoctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to Update" });
    }
};

exports.deleteDoctorWId = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteDoctor = await Doctor.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Deleted Doctor Successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error Deleting Doctor",
        });
    }
};
