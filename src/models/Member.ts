import mongoose from 'mongoose';

export interface MemberInput {
    memberId: string;
    language: string;
    guildId: string;
}

export interface MemberDocument extends MemberInput, mongoose.Document {
    memberId: string;
    language: string;
    guildId: string;
}

const memberSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true,
        unique: false,
    },
    guildId: {
        type: String,
        required: true,
        unique: false,
    },
});

export default mongoose.model<MemberDocument>('Members', memberSchema);
