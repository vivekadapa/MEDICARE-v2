const Doctor = require('../models/DoctorSchema');
const User = require('../models/UserSchema')
const Appointment = require('../models/AppointmentSchema')
const Review = require('../models/ReviewSchema')
const Order = require('../models/OrderSchema');

exports.getAllUsers = async (req, res) => {
    try {
        let query = { role: { $ne: 'admin' } };

        const { isActive } = req.query;

        if (isActive && (isActive === 'active' || isActive === 'blocked')) {
            query.isActive = isActive;
        }

        const users = await User.find(query);

        return res.status(200).json({ users });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
};

exports.getUserDetails = async (req, res) => {
    try {

        const userId = req.user.id;

        const user = await User.findById(userId)
            .populate({
                path: 'appointments',
                model: 'AppointmentModel'
            })
            .populate({
                path: 'orders',
                model: 'MedicineOrder'
            });

        if (user) {
            return res.status(200).json({ user });
        }
        const doctor = await Doctor.findById(userId)
            .populate({
                path: 'appointments',
                model: 'AppointmentModel',
                populate: {
                    path: 'user',
                    model: 'UserModel',
                },
            });
        if (doctor) {
            return res.status(200).json({ doctor });
        }
        return res.status(404).json({ success: false, message: "User not found" });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getUserDetailsWithId = async (req, res) => {
    // const userId = req.params.userId;
    // console.log(`get user details...with ID : ${userId}`);
    const trimmedUserId = req.params.userId;

    try {
        const user = await User.findById(trimmedUserId)
            .populate({
                path: 'appointments',
                model: 'AppointmentModel'
            })
            .populate({
                path: 'orders',
                model: 'MedicineOrder'
            });

        if (user) {
            res.status(200).json({ user });
        } else {
            const doctor = await Doctor.findById(trimmedUserId)
                .populate({
                    path: 'appointments',
                    model: 'AppointmentModel',
                    populate: {
                        path: 'user',
                        model: 'UserModel',
                    },
                });

            if (doctor) {
                res.status(200).json({ doctor });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



exports.updateUser = async (req, res) => {
    const { id } = req.user;
    console.log(req.body);
    const { newUser } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: newUser }, { new: true })
        console.log(updatedUser);
        res.status(200).json({ success: true, message: "Updated Successfully", data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to Update" });
    }
}

exports.updateUserWithId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUserData = req.body;
        console.log(updatedUserData);

        const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};




exports.bookappointment = async (req, res) => {
    console.log(req.body);
    console.log(req.user);
    const { name, gender, age, problem, doctorId, ticketPrice, selectedDate, selectedTime } = req.body;
    console.log(req.body)
    const { id } = req.user;

    try {
        const user = await User.findById(id);
        const doctor = await Doctor.findById(doctorId);

        if (!user || !doctor) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const newAppointment = await Appointment.create({
            doctor: doctorId,
            user: id,
            ticketPrice,
            appointmentDate: selectedDate,
            slot: {
                startTime: selectedTime.split(' - ')[0],
                endTime: selectedTime.split(' - ')[1],
            },
            patientName: name,
            patientGender: gender,
            patientAge: age,
            patientProblem: problem,
        });

        console.log(newAppointment);

        user.appointments.push(newAppointment);
        doctor.appointments.push(newAppointment);

        await user.save();
        await doctor.save();

        return res.status(201).json({
            success: true,
            message: "Appointment Booked Successfully",
            doctor
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};


exports.cancelOrder = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }
        order.cancelOrder = true;
        await order.save();
        res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message })
    }
}

exports.getUserAppointments = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id).populate({
            path: 'appointments',
            populate: {
                path: 'doctor',
                model: 'DoctorModel',
            },
        });

        if (!user) {
            res.status(400).send({ message: "Invalid Request", success: false });
        }

        return res.status(200).send({
            message: "User Appointments Fetched Successfully",
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server Error", success: false });
    }
};

exports.getUserAppointmentsWithId = async (req, res) => {

    const id = req.params.userId;
    try {
        const user = await User.findById(id).populate({
            path: 'appointments',
            populate: {
                path: 'doctor',
                model: 'DoctorModel',
            },
        });

        if (!user) {
            res.status(400).send({ message: "Invalid Request", success: false });
        }
        console.log(user);
        return res.status(200).send({
            message: "User Appointments Fetched Successfully",
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server Error", success: false });
    }
};


exports.writeReview = async (req, res) => {
    const { id, role } = req.user;
    if (role !== "patient") {
        return res.status(400).send({ message: "Only Patients can write a review for doctors", success: false });
    }

    try {
        const user = await User.findById(id);
        const doc = await Doctor.findById(req.body.docId).select("-password").populate({
            path: 'appointments',
            model: 'AppointmentModel',
            populate: {
                path: 'user',
                model: 'UserModel',
            },
        });

        if (!user || !doc) {
            return res.status(400).send({ message: "User or Doctor not found", success: false });
        }
        const hasValidAppointment = doc.appointments.some(appointment => appointment.user._id.equals(user._id));

        if (!hasValidAppointment) {
            return res.status(400).send({ message: "You can only write a review for a doctor if you have booked an appointment", success: false });
        }

        const { userRating, userReview, docId } = req.body;
        const newReview = await Review.create({ doctor: docId, user: id, reviewText: userReview, rating: userRating });

        doc.reviews.push(newReview);
        await doc.save();

        return res.status(200).send({ message: "Review Created Successfully", success: true, doctor: doc });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error in Creating review", success: false });
    }
};


exports.getMedicinesBought = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id).populate('orders')
        // console.log(user);
        res.send({ message: "User Fetched", user });
    } catch (error) {
        console.log(error)
        res.send({ message: "Error in fetching", success: false }).status(500);
    }
}

exports.getMedicinesBoughtWithId = async (req, res) => {
    const id = req.params.userId;
    try {
        const user = await User.findById(id).populate('orders')
        console.log(user);
        res.send({ message: "User Fetched", user });
    } catch (error) {
        console.log(error)
        res.send({ message: "Error in fetching", success: false }).status(500);
    }
}


exports.buymedicines = async (req, res) => {
    try {
        const { id } = req.user;
        const { medicines, totalAmount } = req.body;

        const user = await User.findById(id);

        if (!medicines || !Array.isArray(medicines) || medicines.length === 0 || !totalAmount) {
            return res.status(400).json({ error: 'Invalid request payload' });
        }

        // Create a new order
        const order = new Order({
            userId: id,
            medicines,
            totalAmount,
        });

        // Save the order to the database
        await order.save();
        user.orders.push(order);
        await user.save();

        // Send a response
        res.status(200).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error in buymedicines controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteUser = async (req, res) => {
    const id = req.params.userId
    try {
        const user = await User.findByIdAndDelete(id)
        console.log(user)
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (err) {
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

