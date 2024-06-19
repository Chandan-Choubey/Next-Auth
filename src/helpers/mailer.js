import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async function ({ email, emailType, userId }) {
  try {
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hasedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "89b22bf56ae40c",
        pass: "bb6ee1eefa3c39",
      },
    });

    const mailOptions = {
      from: "",
      to: email,
      subject: `${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }`,
      html: `
<p> Click  <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hasedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in the browser <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hasedToken}</p>`,
    };

    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (error) {
    throw new Error(error);
  }
};
