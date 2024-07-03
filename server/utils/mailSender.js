const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST_NAME,
            auth: {
                user: process.env.USER_NAME,
                pass: process.env.APP_PASS,
            }
        });

        const info = await transporter.sendMail({
            from: process.env.USER_NAME,
            to: email,
            subject: title,
            html: body,
        });
        console.log('Email Info:' + info);
        return info;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mailSender;