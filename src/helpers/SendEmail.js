const nodemailer = require("nodemailer");

module.exports = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: subject,
        html: html,
    });
};
