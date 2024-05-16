import nodemailer from "nodemailer";

type props = {
  email: string;
  otp: string;
  subject?: string;
  text?: string;
};

export function sendEmail({email, otp}: props): void {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.SMT_HOST,
    port: 465, 
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Your OTP for verification",
    text: `Your OTP is ${otp}`,
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
