const express = require("express");
const app = express();

const dbConnect = require("./db/dbConnect.js");
const cors = require("cors");
const hospitalRouter = require("./routes/hospitalRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const otpRouter = require("./routes/otpRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const doctorRouter = require("./routes/doctorRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const medicineRouter = require("./routes/medicineRoutes.js");
require("dotenv").config();
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: __dirname + "/log",
});

app.use(
    morgan(
        "[:date[clf]] :method :url :status :response-time ms - :res[content-length]",
        { stream: accessLogStream }
    )
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://medicare-project-seven.vercel.app",
        "https://72e7-14-139-177-158.ngrok-free.app",
        "*",
    ],
    credentials: true,
};
app.use(cors(corsOptions));

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "MEDICARE API",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
        // components: {
        //     securitySchemes: {
        //       bearerAuth: {
        //         type: "http",
        //         scheme: "bearer",
        //         bearerFormat: "JWT",
        //       },
        //     },
        //   },
        //   security: [
        //     {
        //       bearerAuth: [],
        //     },
        //   ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/auth", authRouter);
app.use("/otp", otpRouter);
app.use("/user", userRouter);
app.use("/doctor", doctorRouter);
app.use("/admin", adminRouter);
app.use("/hospital", hospitalRouter);
app.use("/medicine", medicineRouter);

// const start = async () => {
//     try {
//         await dbConnect(process.env.MONGODB_URI);
//         console.log("Connected to database");
//         app.listen(process.env.PORT || 4000, () => {
//             console.log(
//                 `Server is running on port ${process.env.PORT || 4000}`
//             );
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };

// start();

module.exports = { app };
