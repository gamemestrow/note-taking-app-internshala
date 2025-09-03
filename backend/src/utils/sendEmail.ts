import nodemailer from "nodemailer";
import { generateOtp } from "./otpGenerator";

export const sendEmailFunction = async (email: string) => {
    const otp = await generateOtp(email);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });

    (async () => {
        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: email,
            subject: "Hello ✔",
            text: "OTP FOR PASSWORD RESET", // plain‑text body
            html: `<b>${otp} is your otp</b>`, // HTML body
        });
    })();
};
