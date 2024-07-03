const { app } = require('./app')
const dbConnect = require("./db/dbConnect.js");

const start = async () => {
    try {
        await dbConnect(process.env.MONGODB_URI);
        console.log("Connected to database");
        app.listen(process.env.PORT || 4000, () => {
            console.log(
                `Server is running on port ${process.env.PORT || 4000}`
            );
        });
    } catch (error) {
        console.log(error);
    }
};

start();