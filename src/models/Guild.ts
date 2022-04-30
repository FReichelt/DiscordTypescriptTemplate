import mongoose from 'mongoose';
import config from '../../data/config/config.json';

export interface GuildInput {
    id: string;
    language: string;
}

export interface GuildDocument extends GuildInput, mongoose.Document {
    id: string;
    language: string;
}

const guildSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    language: {
        type: String,
        required: true,
        default: config.defaultLanguage,
    },
});

export default mongoose.model<GuildDocument>('Guilds', guildSchema);
