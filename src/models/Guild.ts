/*
 * Created on Wed Apr 27 2022 17:49:26 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:49:26 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: Guild.ts
 */

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
