const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
})


const DoctorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'doctor'
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    phone: {
        type: String
    },
    photo: {
        type: String,
    },
    ticketPrice: {
        type: Number
    },
    specialization: {
        type: String
    },
    qualification: {
        type: String,
    },
    bio: {
        type: String
    },
    timeSlots: [SlotSchema],
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "AppointmentModel" }],
},{
    timestamps: true

}
)


DoctorSchema.virtual('avgRating').get(function () {
    let length = this.reviews.length;
    if (length == 0) return 0;
    let Rating = 0;
    for (let i = 0; i < length; i++) {
        Rating = Rating + this.reviews[i];
    }
    return Rating / length;
})


const DoctorModel = mongoose.model("DoctorModel", DoctorSchema);

module.exports = DoctorModel