const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema.js");
const OTP = require("../models/OtpSchema.js");
const Doctor = require("../models/DoctorSchema.js");
const { uploadImage } = require("../utils/uploadImage.js");
require("dotenv").config();
const { Redis } = require("@upstash/redis");
const SECRET = process.env.SECRET;
const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_URL;
const UPSTASH_REDIS_TOKEN = process.env.UPSTASH_REDIS_TOKEN;

const client = new Redis({
    url: UPSTASH_REDIS_URL,
    token: UPSTASH_REDIS_TOKEN,
});

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, SECRET, {
        expiresIn: "15d",
    });
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        let newUser;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (req.file) {
            const cloudinaryResult = await uploadImage(req);
            const photoURL = cloudinaryResult.data.secure_url;
            if (role === "doctor") {
                const { specialization, qualification, phone } = req.body;
                newUser = await Doctor.create({
                    name,
                    email,
                    password: hashedPassword,
                    photo: photoURL,
                    specialization,
                    qualification,
                    phone,
                });
            } else {
                newUser = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    photo: photoURL,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Profile picture is required",
            });
        }

        // Store user data in Redis cache
        await client.set(email, newUser);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        // Check if the user exists in Redis cache
        const userData = await client.get(email);

        if (userData) {
            const user = userData;
            const correctPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!correctPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password.",
                });
            }

            const token = generateToken(user);

            return res
                .json({
                    message: "Successfully logged in",
                    success: true,
                    token,
                    user,
                })
                .status(200);
        }

        // If user data not found in cache, query the database
        const regularUser = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (!regularUser && !doctor) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password.",
            });
        }

        let user;
        if (regularUser) {
            user = regularUser;
            if (user.isActive === "blocked") {
                return res.status(400).json({
                    success: false,
                    message: "You have been blocked by the Admin",
                });
            }
        } else if (doctor) {
            user = doctor;
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password.",
            });
        }

        const token = generateToken(user);

        res.json({
            message: "Successfully logged in",
            success: true,
            token,
            user,
        }).status(200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
