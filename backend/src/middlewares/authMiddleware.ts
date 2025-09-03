import { Request,Response,NextFunction } from 'express';
import jwt, {JwtPayload} from "jsonwebtoken"
import userModel from '../models/userModel';

interface CustomJwtPayload extends Request {
    id: string;
}

interface RequestWithUser extends Request {
  user?: any;
}

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = await req.cookies.token;

    if(!token) return res.status(401).send({success: false, message: "Please Login first"});

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload

    if(!decoded) return res.status(400).send({
        success: false, 
        message: "token is not valid"
    })
    req.user = await userModel.findById(decoded.id);

    next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "some error occure"
        })
    }
    
}