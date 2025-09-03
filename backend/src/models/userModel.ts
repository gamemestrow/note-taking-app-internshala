import mongoose ,{Document, Schema} from 'mongoose'

export interface IUser extends Document {
  username: string;
  email: string;
  dateOfBirth: string;
  notes: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth:{
        type: String,
        require: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "note"
    }]

})

export default  mongoose.model<IUser>("user",userSchema)