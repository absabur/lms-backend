const nodemailer = require("nodemailer");


const sendEmailWithNode = async (emailData) => {
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });
  try {
    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    const info = await transporter.sendMail(mailOptions)
    console.log("Send Email Info: "+info.response)
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmailWithNode;