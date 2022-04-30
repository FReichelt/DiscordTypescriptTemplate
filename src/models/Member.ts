import mongoose from 'mongoose';

export interface MemberInput {
    id: string;
    language: string;
}

export interface MemberDocument extends MemberInput, mongoose.Document {
    id: string;
    language: string;
}

const memberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model<MemberDocument>('Members', memberSchema);
