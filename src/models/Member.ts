/*
 * Created on Wed Apr 27 2022 17:49:30 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:49:30 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: Member.ts
 */

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
