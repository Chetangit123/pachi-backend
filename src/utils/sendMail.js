const nodemailer = require("nodemailer");
const { welcomeTemplateFun } = require("../emailTemplates/welcome");
require('dotenv').config

module.exports.genericMail = async (email, name, otp) => {
    const smtpEndpoint = "smtp.gmail.com";
    const port = 587;
    const senderAddress = process.env.SMTP_USERNAME;
    var toAddresses = email;


    const subject = "Welcome to our platform";
    const body_text = "Please Verify Your Email"
    const template = welcomeTemplateFun(name, otp)

    let transporter = nodemailer.createTransport({
        host: smtpEndpoint,
        port: port,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    let mailOptions = {
        from: senderAddress,
        to: toAddresses,
        subject: subject,
        text: body_text,
        html: template,
        headers: {},
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent! Message ID: ", info.messageId);
    console.log(info)
};