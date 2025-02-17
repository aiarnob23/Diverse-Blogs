import nodemailer, { Transporter } from "nodemailer";

export const emailOTP = async (userEmail: string, OTP: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: userEmail, // list of receivers
    subject: "Your OTP code", // Subject line
    text: `Your otp code is ${OTP}. Thanks for finding us.`, // plain text body
  });
};
