import mongoose, { Document, Schema } from "mongoose";

interface Note extends Document {
    title: string,
    noteBody: string,
    date: Date,
    user: mongoose.Types.ObjectId;
}

const noteModel =new Schema<Note>({
    title: {
        type: String,
        required: true,
    },
    noteBody: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

export default mongoose.model<Note>("note", noteModel)