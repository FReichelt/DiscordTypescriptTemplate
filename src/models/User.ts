import mongoose from 'mongoose';

export interface UserInput {
    id: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    id: string;
}

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model<UserDocument>('Users', userSchema);
