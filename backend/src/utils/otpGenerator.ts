import bcrypt from 'bcrypt';
import otpModel from "../models/otpModel";

export async function generateOtp(email: string) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }

    const salt = await bcrypt.genSalt(10);
    const hashotp =  bcrypt.hashSync(otp,salt);

    await otpModel.create({
        email,
        otp: hashotp
    })
    return otp;
}
