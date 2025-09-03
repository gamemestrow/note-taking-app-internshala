import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";

//-------------user Registration--------------//

interface RequestWithUser extends Request {
  user?: string | JwtPayload ;
}

export const userRegistrationContoller = async (req: Request, res: Response) => {
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

export const updateUserContoller = async (req: RequestWithUser, res: Response) => {
    try {
       const {username, email} = req.body;

       await userModel.findByIdAndUpdate({_id: req.user}, {username, email})

       return res.status(200).send({
        success: true,
        message: "user updated"
       })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in logging in user",
        });
    }
};

export const updatePasswordUserContoller = async (req: RequestWithUser, res: Response) => {
    try {
       await userModel.findByIdAndUpdate({_id: req.user})

       return res.status(200).send({
        success: true,
        message: "user deleted"
       })
       
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in logging in user",
        });
    }
};



export const deleteUserContoller = async (req: RequestWithUser, res: Response) => {
    try {
       await userModel.findByIdAndDelete({_id: req.user})

       return res.status(200).send({
        success: true,
        message: "user deleted"
       })
       
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: "error in logging in user",
        });
    }
};
