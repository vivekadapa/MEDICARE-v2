const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    patientGender: {
        type: String,
        required: true
    },
    patientProblem: {
        type: String,
        required: true
    },
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ticketPrice: { type: Number, required: true },
    appointmentDate: {
        type: Date,
        required: true,
    },
    slot: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    isPaid: {
        type: Boolean,
        default: true,
    },
},
    { timestamps: true },
)

module.exports = mongoose.model('AppointmentModel', AppointmentSchema)