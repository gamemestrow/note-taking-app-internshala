import mongoose, { Document, Schema } from "mongoose";

export interface Iotp extends Document {
    email: string;
    otp: string;
    expireAt: Date;
}

const userSchema = new Schema<Iotp>({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    },
});

export default mongoose.model<Iotp>("otp", userSchema);
