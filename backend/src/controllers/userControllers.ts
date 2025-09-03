import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { error } from "node:console";
import { sendEmailFunction } from "../utils/sendEmail";
import otpModel from "../models/otpModel";

//-------------user Registration--------------//

interface MyJwtPayload extends JwtPayload {
    email: string;
}

interface UserPayload {
    id: string;
    email: string;
    password: string;
}

interface RequestWithUser extends Request {
    user?: UserPayload;
}

export const userRegistrationContoller = async (
    req: Request,
    res: Response
) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the form",
            });
        }

        bcrypt.genSalt(10, (err: Error | undefined, salt: string) => {
            bcrypt.hash(
                password,
                salt,
                async (err: Error | undefined, hash: string) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({
                            success: false,
                            message: "some error occure",
                        });
                    }

                    const user = await userModel.create({
                        username,
                        email,
                        password: hash,
                    });

                    const token = jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET as string
                    );

                    res.cookie("token", token);

                    return res.status(200).send({
                        success: true,
                        message: "Now, you can create note...",
                    });
                }
            );
            if (err) {
                console.log(err);
                return res.status(500).send({
                    success: false,
                    message: "some error occure",
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in registering user",
        });
    }
};

export const userLoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "fill all the fields",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user || !user.password)
            return res
                .status(500)
                .send({ success: false, message: "user not found" });

        bcrypt.compare(password, user.password).then(function (result) {
            if (!result) {
                return res.status(401).send({
                    success: false,
                    message: "something went wrong...",
                });
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET as string
            );

            res.cookie("token", token);

            return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                token,
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in logging in user",
        });
    }
};

export const updateUserContoller = async (
    req: RequestWithUser,
    res: Response
) => {
    try {
        const { username, email } = req.body;

        await userModel.findByIdAndUpdate(
            { _id: req.user },
            { username, email }
        );

        return res.status(200).send({
            success: true,
            message: "user updated",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in logging in user",
        });
    }
};

export const updatePasswordController = async (
    req: RequestWithUser,
    res: Response
) => {
    try {
        const { oldpassword, newpassword } = req.body;

        if (!oldpassword || !newpassword) {
            return res.status(400).send({
                success: false,
                message: "Fill all the fields",
            });
        }

        // find user by ID from JWT payload
        const user = await userModel.findById(req.user?.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // compare old password
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        // update user
        user.password = hashedPassword;
        await user.save();

        return res.status(200).send({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "Error in updating password",
        });
    }
};

export const resetPasswordController = async (
    req: RequestWithUser,
    res: Response
) => {
    try {
        const { email } = req.body;

        const otpinBox = await otpModel.findOne({email})

        if(otpinBox){
            await otpModel.findOneAndDelete({email})
        }

        const prevotptoken = await req.cookies?.otptoken;

        if(prevotptoken){
            res.clearCookie("otptoken")
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "user not found",
            });
        }

        sendEmailFunction(email);

        const otptoken = jwt.sign({ email }, process.env.JWT_OTP_SECRET as string);

        res.cookie("otptoken", otptoken);

        return res.status(200).send({
            success: true,
            message: "otp has been sent",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in reset user password",
        });
    }
};

export const checkotpController = async (
    req: RequestWithUser,
    res: Response
) => {
    try {
        const { otp } = req.body;

        if (!otp)
            return res.status(400).send({
                success: false,
                message: "enter the otp",
            });

        const otptoken = req.cookies.otptoken;

        if (!otptoken)
            return res.status(401).send({
                success: false,
                message: "token not found",
            });

        const decoded = jwt.verify(
            otptoken,
            process.env.JWT_OTP_SECRET as string
        ) as string | MyJwtPayload;

        if (typeof decoded === "string" || !decoded.email) {
            return res.status(400).send({
                success: false,
                message: "invalid token payload",
            });
        }

        const hashedotp = await otpModel.findOne({ email: decoded.email });

        console.log(hashedotp)

        if (!hashedotp)
            return res.status(500).send({
                success: false,
                message: "otp is not present",
            });

            console.log(hashedotp.otp)

        const isMatch = await bcrypt.compare(otp, hashedotp.otp);

        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "otp didn't match",
            });
        }

        res.status(200).redirect("http://localhost:4000/api/v1/user/setpassword");
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in checking otp",
        });
    }
};

export const setPasswordController = async (
    req: RequestWithUser,
    res: Response
) => {
    try {
        const otptoken = req.cookies.otptoken;


        const { newpassword } = req.body;

        if (!newpassword) {
            return res.status(400).send({
                success: false,
                message: "Fill all the fields",
            });
        }

        if (!otptoken)
            return res.status(400).send({
                success: false,
                message: "token not found",
            });

        const decoded = jwt.verify(
            otptoken,
            process.env.JWT_OTP_SECRET as string
        ) as string | MyJwtPayload;

        if (typeof decoded === "string" || !decoded.email) {
            return res.status(400).send({
                success: false,
                message: "something went wrong",
            });
        }

        const user = await userModel.findOne({ email: decoded.email });

        if(!user){
            return res.status(400).send({
                success: false,
                message: "user not found"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        // update user
        user.password = hashedPassword;
        await user.save();

        res.clearCookie("otptoken")

        await otpModel.findOneAndDelete({email: decoded.email})

        return res.status(200).send({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in checking otp",
        });
    }
};

export const deleteUserContoller = async (
    req: RequestWithUser,
    res: Response
) => {
    try {
        await userModel.findByIdAndDelete({ _id: req.user });

        return res.status(200).send({
            success: true,
            message: "user deleted",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in logging in user",
        });
    }
};
