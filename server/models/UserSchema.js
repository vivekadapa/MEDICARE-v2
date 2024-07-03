const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: String,
    },
    password: {
        type: String,
        required: String
    },
    phone: {
        type: Number
    },
    photo: {
        type: String
    },
    role: {
        type: String,
        enum: ["patient", "doctor", "admin"],
        default: "patient",
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    bloodType: {
        type: String
    },
    isActive: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },
    appointments: [{ type: mongoose.Types.ObjectId, ref: 'AppointmentModel' }],
    orders:[{type:mongoose.Types.ObjectId,ref:'MedicineOrder'}],
},
{
timestamps:true,
}
)

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;