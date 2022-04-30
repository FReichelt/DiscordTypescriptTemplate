/*
 * Created on Wed Apr 27 2022 17:49:34 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:49:34 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: User.ts
 */

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
