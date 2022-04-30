/*
 * Created on Wed Apr 27 2022 17:49:43 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Last modified on Wed Apr 27 2022 17:49:43 by Florian Reichelt | Fllooo | https://florian-reichelt.de | mail@florian-reichelt.de
 * Copyright: © All rights reserved.
 * Filename: IData.ts
 */
import config from '../../data/config/config.json';
import { GuildDocument } from '../models/Guild';
import { MemberDocument } from '../models/Member';
import { UserDocument } from '../models/User';

export default interface IData {
    config?: typeof config;
    guild?: GuildDocument;
    member?: MemberDocument;
    user?: UserDocument;
}
