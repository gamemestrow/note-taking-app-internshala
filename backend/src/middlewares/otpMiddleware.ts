import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../models/userModel";

interface CustomJwtPayload extends Request {
    id: string;
    email: string;
}

interface RequestWithUser extends Request {
    user?: any;
    email?: string;
}

export const otpMiddleware = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const otptoken = req.cookies.otptoken;
        console.log(otptoken,"token")
        if (!otptoken)
            return res.status(401).send({
                success: false,
                message: "token not found",
            });
        
        const decoded = jwt.verify(
            otptoken,
            process.env.JWT_OTP_SECRET as string
        ) as string | CustomJwtPayload;
        

        if (typeof decoded === "string" || !decoded.email) {
            return res.status(400).send({
                success: false,
                message: "invalid token payload",
            });
        }
        req.email = decoded.email;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "some error occure",
        });
    }
};
